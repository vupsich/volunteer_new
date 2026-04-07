import { TrendingUp, Users, Calendar, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockEvents, mockUsers } from '../../data/mockData';

const activityData = [
  { name: 'Янв', users: 400, events: 24 },
  { name: 'Фев', users: 300, events: 18 },
  { name: 'Мар', users: 500, events: 32 },
  { name: 'Апр', users: 280, events: 28 },
  { name: 'Май', users: 390, events: 35 },
  { name: 'Июн', users: 490, events: 42 },
];

const categoryData = [
  { name: 'Технологии', value: 30 },
  { name: 'Спорт', value: 25 },
  { name: 'Искусство', value: 15 },
  { name: 'Музыка', value: 20 },
  { name: 'Другое', value: 10 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

const recentActivity = [
  { id: 1, user: 'Иван Смирнов', action: 'Зарегистрировался', time: '2 минуты назад' },
  { id: 2, user: 'Анна Кузнецова', action: 'Присоединилась к марафону по уборке пляжа', time: '15 минут назад' },
  { id: 3, user: 'Михаил Иванов', action: 'Завершил конференцию Tech Conference 2026', time: '1 час назад' },
  { id: 4, user: 'Елена Петрова', action: 'Создала новое событие', time: '2 часа назад' },
  { id: 5, user: 'Алексей Соколов', action: 'Обновил профиль', time: '3 часа назад' },
];

export default function AdminDashboard() {
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(u => u.status === 'active').length;
  const totalEvents = mockEvents.length;
  const totalParticipants = mockEvents.reduce((sum, event) => sum + event.joinedParticipants, 0);

  return (
    <div className="space-y-6">
      {/* Карточки статистики */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Всего пользователей</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalUsers}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600">↑ 12%</span> по сравнению с прошлым месяцем
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Активные пользователи</CardTitle>
            <Activity className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{activeUsers}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600">↑ 8%</span> по сравнению с прошлым месяцем
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Всего событий</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalEvents}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600">↑ 24%</span> по сравнению с прошлым месяцем
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Всего участников</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalParticipants}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600">↑ 18%</span> по сравнению с прошлым месяцем
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Графики */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Обзор активности</CardTitle>
            <CardDescription>Статистика пользователей и событий по месяцам</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#3b82f6" name="Пользователи" />
                <Bar dataKey="events" fill="#8b5cf6" name="События" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Категории событий</CardTitle>
            <CardDescription>Распределение событий по категориям</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Рост пользователей</CardTitle>
            <CardDescription>Динамика регистраций за последние месяцы</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="Пользователи" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Последние действия</CardTitle>
            <CardDescription>Свежие действия пользователей и обновления</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}