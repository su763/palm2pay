'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

export default function MerchantDashboard() {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<any>(null);

  // Mock dashboard data
  const todayStats = {
    totalAmount: 1247.50,
    transactionCount: 23,
    completedCount: 22,
    failedCount: 1,
  };

  const recentTransactions = [
    { id: '1', amount: 24.99, customer: 'John D.', time: '2 min ago', status: 'completed' },
    { id: '2', amount: 156.00, customer: 'Sarah M.', time: '5 min ago', status: 'completed' },
    { id: '3', amount: 8.50, customer: 'Mike R.', time: '12 min ago', status: 'completed' },
    { id: '4', amount: 45.00, customer: 'Emily K.', time: '18 min ago', status: 'failed' },
    { id: '5', amount: 89.99, customer: 'David L.', time: '25 min ago', status: 'completed' },
  ];

  const handleProcessPayment = async () => {
    if (!amount) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setLastTransaction({
        amount: parseFloat(amount),
        time: new Date().toLocaleTimeString(),
      });
      setAmount('');
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#1a1a2e] border-r border-gray-800">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <HandIcon className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Palm2Pay</span>
          </div>
          <nav className="space-y-2">
            <NavItem icon="dashboard" label="Dashboard" active />
            <NavItem icon="receipt" label="Transactions" />
            <NavItem icon="users" label="Customers" />
            <NavItem icon="chart" label="Analytics" />
            <NavItem icon="settings" label="Settings" />
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <div>
              <p className="text-white font-medium">Store Name</p>
              <p className="text-gray-400 text-sm">Main Location</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">Welcome back! Here's today's overview.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
              <PlusIcon className="w-5 h-5" />
              New Transaction
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Today's Revenue"
            value={`$${todayStats.totalAmount.toFixed(2)}`}
            change="+12.5%"
            positive
          />
          <StatCard
            title="Transactions"
            value={todayStats.transactionCount.toString()}
            change="+8.2%"
            positive
          />
          <StatCard
            title="Success Rate"
            value={`${((todayStats.completedCount / todayStats.transactionCount) * 100).toFixed(1)}%`}
            change="+2.1%"
            positive
          />
          <StatCard
            title="Failed"
            value={todayStats.failedCount.toString()}
            change="-0.3%"
            positive={false}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Terminal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Payment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a1a2e] rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">Quick Payment Terminal</h2>

              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block text-gray-400 mb-2">Amount (USD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-[#0f0f1a] border border-gray-700 rounded-lg py-3 pl-8 pr-4 text-white text-lg"
                      placeholder="0.00"
                    />
                  </div>

                  <div className="flex gap-2 mt-4">
                    {[5, 10, 20, 50, 100].map((val) => (
                      <button
                        key={val}
                        onClick={() => setAmount(val.toString())}
                        className="flex-1 bg-[#0f0f1a] border border-gray-700 rounded-lg py-2 text-white hover:border-indigo-500"
                      >
                        ${val}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleProcessPayment}
                    disabled={!amount || isProcessing}
                    className="w-full mt-6 bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Spinner />
                        Processing...
                      </>
                    ) : (
                      <>
                        <HandIcon className="w-5 h-5" />
                        Process Palm Payment
                      </>
                    )}
                  </button>

                  {lastTransaction && (
                    <div className="mt-4 p-4 bg-green-900/20 border border-green-800 rounded-lg">
                      <p className="text-green-400 font-medium">Payment Successful!</p>
                      <p className="text-gray-400 text-sm">
                        ${lastTransaction.amount.toFixed(2)} at {lastTransaction.time}
                      </p>
                    </div>
                  )}
                </div>

                <div className="w-64 flex flex-col items-center justify-center bg-[#0f0f1a] rounded-xl p-4">
                  <QRCodeSVG
                    value={`palm2pay://merchant/${'STORE_ID_123'}`}
                    size={180}
                    level="H"
                    includeMargin={false}
                  />
                  <p className="text-gray-400 text-sm mt-4 text-center">
                    Customers can scan to pay
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#1a1a2e] rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
                <button className="text-indigo-500 hover:text-indigo-400">View All</button>
              </div>

              <div className="space-y-4">
                {recentTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 bg-[#0f0f1a] rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.status === 'completed' ? 'bg-green-900/30' : 'bg-red-900/30'
                      }`}>
                        {tx.status === 'completed' ? (
                          <CheckIcon className="w-5 h-5 text-green-500" />
                        ) : (
                          <XIcon className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{tx.customer}</p>
                        <p className="text-gray-400 text-sm">{tx.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">${tx.amount.toFixed(2)}</p>
                      <p className={`text-sm ${
                        tx.status === 'completed' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {tx.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Store Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1a1a2e] rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Store Status</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white font-medium">Online & Accepting Payments</span>
              </div>
              <p className="text-gray-400 text-sm">
                Terminal ID: TERM-001
              </p>
              <button className="w-full mt-4 border border-gray-700 text-gray-300 py-2 rounded-lg hover:bg-gray-800">
                Go Offline
              </button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#1a1a2e] rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <ActionButton icon="refund" label="Process Refund" />
                <ActionButton icon="user" label="Add Customer" />
                <ActionButton icon="receipt" label="Export Report" />
                <ActionButton icon="bell" label="Notifications" />
              </div>
            </motion.div>

            {/* Today's Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1a1a2e] rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Hourly Revenue</h3>
              <div className="h-40 flex items-end justify-between gap-2">
                {[40, 65, 30, 80, 55, 90, 70, 85, 45, 60, 75, 50].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-indigo-600 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-gray-400 text-xs">
                <span>6AM</span>
                <span>12PM</span>
                <span>6PM</span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
        active ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <Icon name={icon} className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );
}

function StatCard({ title, value, change, positive }: { title: string; value: string; change: string; positive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1a1a2e] rounded-xl p-6"
    >
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-3xl font-bold text-white mb-2">{value}</p>
      <p className={`text-sm ${positive ? 'text-green-500' : 'text-red-500'}`}>
        {positive ? '↑' : '↓'} {change} from yesterday
      </p>
    </motion.div>
  );
}

function ActionButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg">
      <Icon name={icon} className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}

function Icon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, JSX.Element> = {
    dashboard: <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />,
    receipt: <path d="M7 3v2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-2V3h-2v2H9V3H7zm0 4h2v2H7V7zm4 0h2v2h-2V7zm4 0h2v2h-2V7z" />,
    users: <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
    chart: <path d="M3 3v18h18v-2H5V3H3zm4 14h2v-6H7v6zm4 0h2V9h-2v8zm4 0h2V5h-2v12z" />,
    settings: <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.42h-3.84a.484.484 0 00-.48.42l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 00-.59.22L2.09 8.83a.488.488 0 00.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.488.488 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.27.42.48.42h3.84c.24 0 .44-.17.48-.42l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.488.488 0 00-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />,
    refund: <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />,
    user: <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
    bell: <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />,
  };

  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      {icons[name] || icons.dashboard}
    </svg>
  );
}

function HandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2a2 2 0 0 1 2 2v6a2 2 0 0 1-4 0V4a2 2 0 0 1 2-2zm-4 4a2 2 0 0 1 2 2v6a2 2 0 0 1-4 0V8a2 2 0 0 1 2-2zm8 0a2 2 0 0 1 2 2v6a2 2 0 0 1-4 0V8a2 2 0 0 1 2-2zm-4 8a4 4 0 0 0-4 4v2a4 4 0 0 0 8 0v-2a4 4 0 0 0-4-4z" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}
