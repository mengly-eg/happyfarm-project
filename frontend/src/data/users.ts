import type { User } from '../types'

export const currentUser: User = {
  id: 1,
  name: 'Sokha Meas',
  email: 'sokha@happyfarm.kh',
  phone: '+855 12 345 678',
  role: 'farmer',
  location: 'Siem Reap',
}

export const sellerUser: User = {
  id: 2,
  name: 'Dara Agri Tools',
  email: 'dara@agritools.kh',
  phone: '+855 98 765 432',
  role: 'seller',
  location: 'Phnom Penh',
}

export const sellerUser2: User = {
  id: 3,
  name: 'Green Supply Co.',
  email: 'contact@greensupply.kh',
  phone: '+855 77 111 222',
  role: 'seller',
  location: 'Battambang',
}
