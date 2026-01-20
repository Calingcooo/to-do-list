import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AdminUserSeeder extends BaseSeeder {
  public async run() {
    // Check if admin already exists
    const existingAdmin = await User.query().where('email', 'test@admin.com').first()
    if (existingAdmin) {
      console.log('Admin user already exists. Skipping seeder.')
      return
    }

    // Create admin user
    await User.create({
      fullName: 'Admin User',
      email: 'test@admin.com',
      password: await hash.make('1234567'),
      role: 'admin',
    })

    console.log('Admin user created successfully!')
  }
}
