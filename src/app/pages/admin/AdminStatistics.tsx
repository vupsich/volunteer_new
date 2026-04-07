import { TrendingUp, Users, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from '../../components/ui/badge';
import { mockEvents, mockUsers } from '../../data/mockData';

const participantTrend = [
  { month: 'Янв', participants: 320 },
  { month: 'Фев', participants: 450 },
  { month: 'Мар', participants: 680 },
  { month: 'Апр', participants: 920 },
  { month: 'Май', participants: 1100 },
  { month: 'Июн', participants: 1450 },
];

const eventsByCategory = [
  { category: 'Технологии', count: 45, growth: 12 },
  { category: 'Спорт', count: 38, growth: 8 },
  { category: 'Искусство', count: 28, growth: 15 },
  { category: 'Музыка', count: 32, growth: 10 },
  { category: 'Бизнес', count: 25, growth: 5 },
  { category: 'Экология', count: 22, growth: 18 },
];

const topEvents = [
  { name: 'Техно-конференция 2026', participants: 187, capacity: 200, revenue: 5610 },
  { name: 'Музыкальный фестиваль', participants: 856, capacity: 1000, revenue: 25680 },
  { name: 'Городской марафон', participants: 423, capacity: 500, revenue: 10575 },
  { name: 'Фестиваль еды и вина', participants: 142, capacity: 150, revenue: 4260 },
  { name: 'Благотворительный гала-вечер', participants: 98, capacity: 120, revenue: 2940 },
];

const userEngagement = [
  { day: 'Пн', active: 480, events: 12 },
  { day: 'Вт', active: 520, events: 15 },
  { day: 'Ср', active: 590, events: 18 },
  { day: 'Чт', active: 610, events: 16 },
  { day: 'Пт', active: 730, events: 22 },
  { day: 'Сб', active: 890, events: 28 },
  { day: 'Вс', active: 820, events: 25 },
];

export default function AdminStatistics() {
  const totalParticipants = mockEvents.reduce((sum, event) => sum + event.joinedParticipants, 0);
  const avgParticipation = (totalParticipants / mockEvents.length).toFixed(1);
  const totalPoints = mockUsers.reduce((sum, user) => sum + user.totalPoints, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl">Статистика и аналитика</h2>
        <p className="text-gray-600">Всесторонние показатели и метрики эффективности</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Всего участников</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalParticipants}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600">↑ 18%</span> по сравнению с прошлым периодом
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Средняя посещаемость</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{avgParticipation}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600">↑ 8%</span> по сравнению с прошлым периодом
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Всего очков</CardTitle>
            <Award className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalPoints.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600">↑ 22%</span> по сравнению с прошлым периодом
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Активных мероприятий</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{mockEvents.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600">↑ 15%</span> по сравнению с прошлым периодом
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Рост участников</CardTitle>
            <CardDescription>Тенденция регистраций участников по месяцам</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={participantTrend}>
                <defs>
                  <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="participants" stroke="#3b82f6" fillOpacity={1} fill="url(#colorParticipants)" name="Участники" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Вовлечённость пользователей</CardTitle>
            <CardDescription>Ежедневная активность пользователей и мероприятий</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userEngagement}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={2} name="Активные пользователи" />
                <Line type="monotone" dataKey="events" stroke="#8b5cf6" strokeWidth={2} name="Мероприятия" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Мероприятия по категориям</CardTitle>
          <CardDescription>Аналитика по категориям мероприятий</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventsByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" name="Количество событий" />
              <Bar dataKey="growth" fill="#10b981" name="Рост %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Performing Events */}
      <Card>
        <CardHeader>
          <CardTitle>Лучшие мероприятия</CardTitle>
          <CardDescription>События с наибольшим участием и доходом</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="bg-blue-600">{index + 1}</Badge>
                    <h4 className="font-medium">{event.name}</h4>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div>
                      <span className="text-gray-500">Участников:</span>{' '}
                      <span className="font-medium">{event.participants}/{event.capacity}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Заполненность:</span>{' '}
                      <span className="font-medium">{((event.participants / event.capacity) * 100).toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Доход:</span>{' '}
                      <span className="font-medium text-green-600">{event.revenue} ₽</span>
                    </div>
                  </div>
                </div>
                <div className="w-32">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${(event.participants / event.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Insights */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Самый популярный день</CardTitle>
            <CardDescription>Пик активности пользователей</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">Суббота</div>
            <p className="text-sm text-gray-600">890 активных пользователей</p>
            <p className="text-sm text-gray-600">28 посещённых мероприятий</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Топовая категория</CardTitle>
            <CardDescription>Самый популярный тип мероприятий</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">Технологии</div>
            <p className="text-sm text-gray-600">45 мероприятий</p>
            <p className="text-sm text-green-600">↑ рост 12%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Процент завершения</CardTitle>
            <CardDescription>Успешно завершённые Мероприятия</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">87.5%</div>
            <p className="text-sm text-gray-600">На основе всех мероприятий</p>
            <p className="text-sm text-green-600">Выше среднего по отрасли</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}