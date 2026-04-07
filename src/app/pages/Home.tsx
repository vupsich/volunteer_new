import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, MapPin, Calendar, Filter, Users as UsersIcon, Award, X, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { mockEvents, countries, regions, cities, categories } from '../data/mockData';
import type { Event } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

// Импорты для карты OpenStreetMap
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Исправляем иконки маркеров Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export default function Home() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const eventsPerPage = 6;

  // Стиль для скрытия флага Leaflet
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .leaflet-attribution-flag {
        display: none !important;
      }
      .leaflet-control-attribution {
        font-size: 9px !important;
        background: rgba(255,255,255,0.7) !important;
        padding: 2px 5px !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const handleJoinEvent = (event: Event) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    toast.success(`Вы успешно присоединились к событию "${event.title}"!`);
  };

  const handleLogout = () => {
    logout();
    toast.success('Выход выполнен успешно');
  };

  // Декоративные маркеры для карты (Иркутск)
  const mapMarkers = [
    { id: 1, position: [52.285, 104.289], name: 'Иркутск', description: 'Центр города' },
    { id: 2, position: [52.286, 104.280], name: 'Площадь Кирова', description: 'Главная площадь' },
    { id: 3, position: [52.292, 104.296], name: '130-й квартал', description: 'Исторический район' },
    { id: 4, position: [52.275, 104.289], name: 'Набережная Ангары', description: 'Живописная набережная' },
    { id: 5, position: [52.308, 104.296], name: 'Иркутский академический театр', description: 'Культурное место' },
    { id: 6, position: [52.257, 104.261], name: 'Ботанический сад', description: 'Природный уголок' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-semibold">EventHub</span>
          </Link>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost">Личный кабинет</Button>
                </Link>
                <Button variant="ghost" onClick={handleLogout}>
                  Выйти
                </Button>
                <Link to="/dashboard">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" />
                    <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Вход</Button>
                </Link>
                <Link to="/register">
                  <Button>Регистрация</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero-секция */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl mb-4">Откройте для себя возможности помогать.</h1>
          <p className="text-xl text-blue-100 mb-8">Присоединяйтесь к тысячам людей, переживающих незабываемые моменты</p>
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2 bg-white rounded-lg p-2">
              <Input
                placeholder="Поиск событий..."
                className="border-0 focus-visible:ring-0"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Search className="mr-2 h-4 w-4" />
                Найти
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Карта + быстрая статистика */}
      <div className="container mx-auto px-4 py-6">
        <Card className="shadow-md border-0 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-blue-600" />
              Расположение событий в Иркутске
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="rounded-xl overflow-hidden h-[400px] w-full border border-gray-200">
              <MapContainer
                center={[52.285, 104.289]}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
                attributionControl={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> участники'
                />
                {mapMarkers.map((marker) => (
                  <Marker key={marker.id} position={marker.position as [number, number]}>
                    <Popup>
                      <strong>{marker.name}</strong>
                      <br />
                      {marker.description}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">Быстрая статистика</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-blue-600">{filteredEvents.length}</p>
                  <p className="text-xs text-gray-600">Всего событий</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-purple-600">{cities.length}</p>
                  <p className="text-xs text-gray-600">Городов</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Панель фильтров */}
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex flex-wrap gap-3 items-center">
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Фильтры
              </Button>
              
              <Select>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Местоположение" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все города</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input 
                type="date" 
                className="w-[160px]" 
                placeholder="Дата"
              />

              <div className="flex-1" />
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span>{filteredEvents.length} событий найдено</span>
              </div>
            </div>

            {/* Расширенные фильтры */}
            {showFilters && (
              <div className="grid md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                <div>
                  <label className="text-sm font-medium mb-2 block">Страна</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите страну" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Регион</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите регион" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Сложность</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Любой уровень" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Начинающий</SelectItem>
                      <SelectItem value="intermediate">Средний</SelectItem>
                      <SelectItem value="advanced">Продвинутый</SelectItem>
                      <SelectItem value="expert">Эксперт</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Диапазон очков</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Любые очки" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-50">0-50 очков</SelectItem>
                      <SelectItem value="51-100">51-100 очков</SelectItem>
                      <SelectItem value="101-200">101-200 очков</SelectItem>
                      <SelectItem value="201+">201+ очков</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-4 flex justify-between items-center">
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4 mr-2" />
                    Сбросить все фильтры
                  </Button>
                  <Badge variant="outline" className="text-blue-600">
                    0 активных фильтров
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Список событий (без правой колонки) */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl mb-1">Предстоящие события</h2>
            <p className="text-gray-600 text-sm">
              {indexOfFirstEvent + 1}-{Math.min(indexOfLastEvent, filteredEvents.length)} из {filteredEvents.length} событий
            </p>
          </div>
          <Select defaultValue="date">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">По дате</SelectItem>
              <SelectItem value="popular">Самые популярные</SelectItem>
              <SelectItem value="points">Наибольшее количество очков</SelectItem>
              <SelectItem value="new">Сначала новые</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 gap-6 w-[90%] mx-auto">
          {currentEvents.map((event) => (
            <Card 
              key={event.id} 
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                <Badge className="absolute top-4 left-4 bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm">
                  {event.category}
                </Badge>
                <div className="absolute bottom-4 right-4">
                  <Badge className="bg-blue-600 text-white border-0 shadow-lg">
                    <Award className="h-3 w-3 mr-1" />
                    {event.points} очков
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(event.date).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {event.city}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="pb-4">
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {event.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <UsersIcon className="h-4 w-4" />
                      <span className="font-medium text-gray-900">
                        {event.joinedParticipants}
                      </span>
                      <span>/ {event.requiredParticipants}</span>
                    </span>
                    <span className="text-xs font-medium text-gray-600">
                      {((event.joinedParticipants / event.requiredParticipants) * 100).toFixed(0)}% заполнено
                    </span>
                  </div>
                  
                  <div className="relative bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${(event.joinedParticipants / event.requiredParticipants) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="gap-2 pt-0">
                <Button 
                  variant="outline" 
                  className="flex-1 group-hover:border-blue-600 group-hover:text-blue-600"
                  onClick={() => setSelectedEvent(event)}
                >
                  Подробнее
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => handleJoinEvent(event)}
                >
                  <UsersIcon className="h-4 w-4 mr-2" />
                  Участвовать
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Назад
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Вперёд
            </Button>
          </div>
        )}
      </div>

      {/* Диалог с деталями события */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedEvent.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-blue-600">
                    {selectedEvent.category}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-5 w-5" />
                      <div>
                        <p className="text-sm">Дата</p>
                        <p className="font-medium text-gray-900">
                          {new Date(selectedEvent.date).toLocaleDateString('ru-RU', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-5 w-5" />
                      <div>
                        <p className="text-sm">Местоположение</p>
                        <p className="font-medium text-gray-900">
                          {selectedEvent.city}, {selectedEvent.region}, {selectedEvent.country}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <UsersIcon className="h-5 w-5" />
                      <div>
                        <p className="text-sm">Участники</p>
                        <p className="font-medium text-gray-900">
                          {selectedEvent.joinedParticipants} / {selectedEvent.requiredParticipants} присоединились
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="h-5 w-5" />
                      <div>
                        <p className="text-sm">Награда</p>
                        <p className="font-medium text-blue-600">+{selectedEvent.points} очков</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">О событии</h3>
                  <p className="text-gray-600">{selectedEvent.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Прогресс набора участников</h3>
                  <div className="bg-gray-100 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{
                        width: `${(selectedEvent.joinedParticipants / selectedEvent.requiredParticipants) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Заполнено на {((selectedEvent.joinedParticipants / selectedEvent.requiredParticipants) * 100).toFixed(1)}%
                  </p>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    className="flex-1" 
                    size="lg"
                    onClick={() => {
                      handleJoinEvent(selectedEvent);
                      setSelectedEvent(null);
                    }}
                  >
                    <UsersIcon className="mr-2 h-5 w-5" />
                    Участвовать
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setSelectedEvent(null)}
                  >
                    Закрыть
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg"></div>
                <span className="text-xl font-semibold">EventHub</span>
              </div>
              <p className="text-gray-400 text-sm">
                Объединяем людей через удивительные впечатления
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Платформа</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Обзор событий</li>
                <li>Как это работает</li>
                <li>Цены</li>
                <li>О нас</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Поддержка</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Центр помощи</li>
                <li>Связаться с нами</li>
                <li>Часто задаваемые вопросы</li>
                <li>Условия использования</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Новостная рассылка</h3>
              <p className="text-sm text-gray-400 mb-4">
                Получайте обновления о новых событиях
              </p>
              <div className="flex gap-2">
                <Input placeholder="Ваш email" className="bg-gray-800 border-gray-700" />
                <Button>Подписаться</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2026 EventHub. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}