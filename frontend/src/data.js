export const STORAGE = {
  transactions: 'ganesh_fund_transactions_v2',
  members: 'ganesh_fund_members_v2',
  settings: 'ganesh_fund_settings_v2'
};

export const defaultMembers = [
  { id: 1, name: 'Chandra Shekar Manne', role: 'President', phone: '9876543210' },
  { id: 2, name: 'Srinivas Reddy', role: 'Vice President', phone: '9876543211' },
  { id: 3, name: 'Lakshmi Prasad', role: 'Secretary', phone: '9876543212' },
  { id: 4, name: 'Venkatesh Rao', role: 'Treasurer', phone: '9876543213' },
  { id: 5, name: 'Suresh Kumar', role: 'Member', phone: '9876543214' }
];

export const demoTransactions = [
  { id: 1, date: '2026-09-01', type: 'add', person: 'Anil', description: 'Donation', amount: 4000 },
  { id: 2, date: '2026-09-02', type: 'add', person: 'Committee', description: 'Committee Collection', amount: 5000 },
  { id: 3, date: '2026-09-03', type: 'withdraw', person: 'Committee', description: 'Sound System', amount: 1950 },
  { id: 4, date: '2026-09-04', type: 'add', person: 'Lakshmi', description: 'Donation', amount: 2500 },
  { id: 5, date: '2026-09-06', type: 'withdraw', person: 'Committee', description: 'Pooja Items', amount: 1500 },
  { id: 6, date: '2026-09-08', type: 'add', person: 'Suresh', description: 'Donation', amount: 3000 },
  { id: 7, date: '2026-09-10', type: 'withdraw', person: 'Committee', description: 'Decoration', amount: 2500 },
  { id: 8, date: '2026-09-11', type: 'add', person: 'Ramesh', description: 'Donation', amount: 5000 }
];

export const defaultSettings = {
  committeeName: 'Shri Ganesh Utsav Committee',
  festivalYear: '2026',
  adminPassword: 'ganesha123'
};
