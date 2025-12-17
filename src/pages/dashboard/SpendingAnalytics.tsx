import { motion } from 'framer-motion';
import { TrendingUp, IndianRupee, ShoppingBag, Calendar } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useOrderStore } from '../../stores/orderStore';
import { useAuthStore } from '../../stores/authStore';
import { generateSpendingAnalytics } from '../../utils/userDataGenerator';
import { useMemo } from 'react';

const categoryColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export const SpendingAnalytics = () => {
  const { orders } = useOrderStore();
  const { user } = useAuthStore();

  const monthlySpendingData = useMemo(() => {
    if (user) {
      return generateSpendingAnalytics(user.id);
    }
    return [];
  }, [user]);

  const categorySpendingData = useMemo(() => {
    const categoryMap: Record<string, { amount: number; count: number }> = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const category = 'General';
        if (!categoryMap[category]) {
          categoryMap[category] = { amount: 0, count: 0 };
        }
        categoryMap[category].amount += item.price * item.quantity;
        categoryMap[category].count += 1;
      });
    });

    return Object.entries(categoryMap).map(([category, data]) => ({
      category,
      amount: Math.round(data.amount * 100) / 100,
      count: data.count,
    }));
  }, [orders]);

  const pieData = useMemo(() => {
    return categorySpendingData.map((cat, index) => ({
      name: cat.category,
      value: cat.amount,
      color: categoryColors[index % categoryColors.length],
    }));
  }, [categorySpendingData]);

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = orders.length > 0 ? totalSpent / orders.length : 0;
  const totalOrders = orders.length;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Spending Analytics</h2>
        <p className="text-gray-600">Track your shopping habits and expenses</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <IndianRupee className="w-10 h-10" />
            <TrendingUp className="w-6 h-6 opacity-75" />
          </div>
          <p className="text-blue-100 mb-1">Total Spent</p>
          <p className="text-3xl font-bold">₹{totalSpent.toFixed(2)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <p className="text-green-100 mb-1">Average Order</p>
          <p className="text-3xl font-bold">₹{averageOrderValue.toFixed(2)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-md p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-10 h-10" />
          </div>
          <p className="text-orange-100 mb-1">Total Orders</p>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-md p-8 mb-8"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Spending Trend</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlySpendingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: '#3B82F6', r: 6 }}
              activeDot={{ r: 8 }}
              name="Spending (₹)"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Spending by Category
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={categorySpendingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="category" stroke="#6B7280" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="amount" fill="#3B82F6" name="Amount (₹)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Category Distribution
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl shadow-md p-8 mt-8"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Category Breakdown</h3>
        <div className="space-y-4">
          {categorySpendingData.map((category, index) => {
            const percentage = (category.amount / totalSpent) * 100;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: pieData[index].color }}
                    />
                    <span className="font-medium text-gray-900">
                      {category.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ₹{category.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">{category.count} orders</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: pieData[index].color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
