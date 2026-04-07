import { useState } from 'react';
import { Link } from 'react-router';
import { User as UserIcon, Star, Trophy, Calendar, MapPin, Users, MessageSquare, Settings, LogOut, Search, Filter, Eye, EyeOff, Trash2, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { mockEvents, mockAchievements, mockFriends, mockMessages, categories, countries, cities } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import type { Event } from '../data/mockData';

// Текущий пользователь (заглушка)
const initialUser = {
  fullName: 'Иван Смирнов',
  username: 'ivan.smirnov',
  email: 'ivan@example.com',
  age: 28,
  country: 'Россия',
  city: 'Москва',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
  rating: 4.8,
  balance: 1250,
  rank: 'Золотой',
  totalPoints: 3500,
  completedEvents: 24,
};

export default function UserDashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userEvents, setUserEvents] = useState<Event[]>(mockEvents.slice(0, 6));
  const [selectedFriend, setSelectedFriend] = useState(mockFriends[0]);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<{ [key: string]: { sender: string; text: string; timestamp: Date }[] }>({});
  const [profileForm, setProfileForm] = useState({
    fullName: currentUser.fullName,
    username: currentUser.username,
    email: currentUser.email,
    age: currentUser.age.toString(),
    country: currentUser.country,
    city: currentUser.city,
    password: '',
    avatar: currentUser.avatar,
  });

  const handleLogout = () => {
    logout();
    toast.success('Выход выполнен успешно');
  };

  const handleLeaveEvent = (eventId: string) => {
    setUserEvents(userEvents.filter(e => e.id !== eventId));
    toast.success('Вы покинули событие');
  };

  const handleEditProfile = () => {
    setProfileForm({
      fullName: currentUser.fullName,
      username: currentUser.username,
      email: currentUser.email,
      age: currentUser.age.toString(),
      country: currentUser.country,
      city: currentUser.city,
      password: '',
      avatar: currentUser.avatar,
    });
    setEditProfileOpen(true);
  };

  const handleSaveProfile = () => {
    setCurrentUser({
      ...currentUser,
      fullName: profileForm.fullName,
      username: profileForm.username,
      email: profileForm.email,
      age: parseInt(profileForm.age),
      country: profileForm.country,
      city: profileForm.city,
      avatar: profileForm.avatar,
    });
    toast.success('Профиль обновлён');
    setEditProfileOpen(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm({ ...profileForm, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    toast.success('Аккаунт удалён');
    logout();
    setDeleteAccountOpen(false);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast.error('Введите текст сообщения');
      return;
    }
    
    const newMessage = {
      sender: 'me',
      text: messageText,
      timestamp: new Date(),
    };
    
    setMessages(prev => ({
      ...prev,
      [selectedFriend.id]: [...(prev[selectedFriend.id] || []), newMessage],
    }));
    
    toast.success(`Сообщение отправлено ${selectedFriend.name}`);
    setMessageText('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-semibold">EventHub</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setActiveTab('messages')}>
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleEditProfile}>
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
            <Avatar className="cursor-pointer" onClick={() => setActiveTab('overview')}>
              <AvatarImage src={currentUser.avatar} alt={currentUser.fullName} />
              <AvatarFallback>{currentUser.fullName[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={currentUser.avatar} alt={currentUser.fullName} />
              <AvatarFallback>{currentUser.fullName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl">{currentUser.fullName}</h1>
                <Badge className="bg-yellow-500">
                  <Trophy className="h-3 w-3 mr-1" />
                  {currentUser.rank}
                </Badge>
              </div>
              <p className="text-gray-600">@{currentUser.username}</p>
              <div className="flex items-center gap-6 mt-4">
                <div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(currentUser.rating) ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{currentUser.rating} Рейтинг</p>
                </div>
                <div className="border-l pl-6">
                  <p className="text-2xl">{currentUser.totalPoints}</p>
                  <p className="text-sm text-gray-600">Всего очков</p>
                </div>
                <div className="border-l pl-6">
                  <p className="text-2xl">${currentUser.balance}</p>
                  <p className="text-sm text-gray-600">Баланс</p>
                </div>
                <div className="border-l pl-6">
                  <p className="text-2xl">{currentUser.completedEvents}</p>
                  <p className="text-sm text-gray-600">Событий пройдено</p>
                </div>
              </div>
            </div>
            <Button onClick={handleEditProfile}>Редактировать профиль</Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-2xl grid-cols-5">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="events">События</TabsTrigger>
            <TabsTrigger value="achievements">Достижения</TabsTrigger>
            <TabsTrigger value="friends">Друзья</TabsTrigger>
            <TabsTrigger value="messages">Сообщения</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ближайшие события</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex gap-3">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{event.title}</p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(event.date).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Недавние достижения</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAchievements.filter(a => a.unlockedDate).slice(0, 3).map((achievement) => (
                      <div key={achievement.id} className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{achievement.title}</p>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Активные друзья</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockFriends.filter(f => f.status === 'online').map((friend) => (
                      <div key={friend.id} className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={friend.avatar} alt={friend.name} />
                            <AvatarFallback>{friend.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{friend.name}</p>
                          <p className="text-sm text-gray-600">{friend.mutualFriends} общих друзей</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <div className="mb-6 flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input placeholder="Поиск событий..." className="pl-10" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все события</SelectItem>
                  <SelectItem value="upcoming">Предстоящие</SelectItem>
                  <SelectItem value="completed">Завершённые</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {userEvents.map((event) => (
                <Card key={event.id}>
                  <div className="flex gap-4 p-6">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{event.title}</h3>
                        <Badge>{event.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(event.date).toLocaleDateString('ru-RU')}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.city}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm">Подробнее</Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleLeaveEvent(event.id)}
                        >
                          Покинуть событие
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Карта событий */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Просмотр на карте
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-100 rounded-lg h-[400px] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Карта ваших событий</p>
                    </div>
                  </div>
                  {userEvents.slice(0, 6).map((event, index) => (
                    <div
                      key={event.id}
                      className="absolute w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                      style={{
                        left: `${20 + index * 13}%`,
                        top: `${30 + (index % 4) * 15}%`,
                      }}
                      title={event.title}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {mockAchievements.map((achievement) => (
                <Card key={achievement.id} className={achievement.unlockedDate ? '' : 'opacity-50'}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle>{achievement.title}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant={achievement.unlockedDate ? 'default' : 'outline'}>
                        +{achievement.points} очков
                      </Badge>
                      {achievement.unlockedDate && (
                        <p className="text-sm text-gray-600">
                          {new Date(achievement.unlockedDate).toLocaleDateString('ru-RU')}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="friends" className="mt-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input placeholder="Поиск друзей..." className="pl-10" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFriends.map((friend) => (
                <Card key={friend.id}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute bottom-0 right-0 w-4 h-4 ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'} rounded-full border-2 border-white`}></div>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{friend.name}</CardTitle>
                        <p className="text-sm text-gray-600">
                          {friend.status === 'online' ? 'В сети' : 'Не в сети'}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{friend.mutualFriends} общих друзей</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          setSelectedFriend(friend);
                          setActiveTab('messages');
                        }}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Написать
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <UserIcon className="h-4 w-4 mr-2" />
                        Профиль
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="mt-6">
            <div className="grid lg:grid-cols-[1fr,2fr] gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Друзья</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockFriends.map((friend) => (
                      <div
                        key={friend.id}
                        onClick={() => setSelectedFriend(friend)}
                        className={`p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${selectedFriend.id === friend.id ? 'bg-blue-50 border border-blue-200' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={friend.avatar} alt={friend.name} />
                              <AvatarFallback>{friend.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className={`absolute bottom-0 right-0 w-3 h-3 ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'} rounded-full border-2 border-white`}></div>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{friend.name}</p>
                            <p className="text-sm text-gray-600">
                              {friend.status === 'online' ? 'В сети' : 'Не в сети'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedFriend.avatar} alt={selectedFriend.name} />
                      <AvatarFallback>{selectedFriend.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{selectedFriend.name}</CardTitle>
                      <CardDescription>
                        {selectedFriend.status === 'online' ? 'В сети' : 'Не в сети'}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-[400px] bg-gray-50 rounded-lg p-4 overflow-y-auto space-y-3">
                    {messages[selectedFriend.id] && messages[selectedFriend.id].length > 0 ? (
                      messages[selectedFriend.id].map((msg, index) => (
                        <div 
                          key={index} 
                          className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] p-3 rounded-lg ${
                            msg.sender === 'me' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white border border-gray-200'
                          }`}>
                            <p className="text-sm">{msg.text}</p>
                            <p className={`text-xs mt-1 ${
                              msg.sender === 'me' ? 'text-blue-100' : 'text-gray-400'
                            }`}>
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-center text-gray-500 text-sm">
                          Пока нет сообщений. Начните диалог!
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      placeholder={`Напишите ${selectedFriend.name}...`}
                      rows={3}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                    <Button onClick={handleSendMessage} className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Отправить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Диалог редактирования профиля */}
      <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать профиль</DialogTitle>
            <DialogDescription>Обновите информацию о себе</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Фото профиля</Label>
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profileForm.avatar} />
                  <AvatarFallback>{profileForm.fullName[0]}</AvatarFallback>
                </Avatar>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Полное имя</Label>
                <Input
                  value={profileForm.fullName}
                  onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Имя пользователя</Label>
                <Input
                  value={profileForm.username}
                  onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Возраст</Label>
                <Input
                  type="number"
                  value={profileForm.age}
                  onChange={(e) => setProfileForm({ ...profileForm, age: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Страна</Label>
                <Select
                  value={profileForm.country}
                  onValueChange={(value) => setProfileForm({ ...profileForm, country: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Город</Label>
                <Select
                  value={profileForm.city}
                  onValueChange={(value) => setProfileForm({ ...profileForm, city: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Новый пароль (оставьте пустым, чтобы не менять)</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={profileForm.password}
                  onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                  placeholder="Введите новый пароль"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="pt-4 border-t">
              <Button
                variant="destructive"
                onClick={() => {
                  setEditProfileOpen(false);
                  setDeleteAccountOpen(true);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Удалить аккаунт
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditProfileOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSaveProfile}>Сохранить изменения</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Подтверждение удаления аккаунта */}
      <AlertDialog open={deleteAccountOpen} onOpenChange={setDeleteAccountOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить аккаунт</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить свой аккаунт? Это действие необратимо.
              Все ваши данные, включая события, достижения и сообщения, будут удалены навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
              Удалить аккаунт
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}