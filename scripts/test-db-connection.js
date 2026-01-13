// Скрипт для проверки подключения к базе данных
const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
})

async function testConnection() {
  try {
    console.log('🔌 Проверка подключения к базе данных...')
    console.log('DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'))
    
    // Проверка подключения
    const client = await pool.connect()
    console.log('✅ Подключение успешно!')
    
    // Проверка существования таблиц
    console.log('\n📊 Проверка таблиц...')
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `)
    
    const tables = tablesResult.rows.map(row => row.table_name)
    console.log('Найденные таблицы:', tables)
    
    const requiredTables = ['products', 'promo_blocks', 'newsletter_subscriptions']
    const missingTables = requiredTables.filter(table => !tables.includes(table))
    
    if (missingTables.length > 0) {
      console.log('⚠️  Отсутствующие таблицы:', missingTables)
      console.log('   Выполните миграцию: psql -h ... -f database/schema.sql')
    } else {
      console.log('✅ Все необходимые таблицы существуют!')
    }
    
    // Проверка данных
    console.log('\n📦 Проверка данных...')
    
    const productsCount = await client.query('SELECT COUNT(*) FROM products')
    console.log(`Товаров в БД: ${productsCount.rows[0].count}`)
    
    const promoCount = await client.query('SELECT COUNT(*) FROM promo_blocks')
    console.log(`Промо-блоков в БД: ${promoCount.rows[0].count}`)
    
    const newsletterCount = await client.query('SELECT COUNT(*) FROM newsletter_subscriptions')
    console.log(`Подписок на рассылку: ${newsletterCount.rows[0].count}`)
    
    client.release()
    await pool.end()
    
    console.log('\n✅ Все проверки пройдены успешно!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Ошибка:', error.message)
    console.error('\nПроверьте:')
    console.error('1. Правильность DATABASE_URL в .env')
    console.error('2. Доступность базы данных с этого сервера')
    console.error('3. Правильность пароля (символ @ должен быть экранирован как %40)')
    process.exit(1)
  }
}

testConnection()
