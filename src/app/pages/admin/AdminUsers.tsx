import { useState } from 'react';
import { Search, Ban, Trash2, Mail, Shield, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Card, CardContent } from '../../components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/ui/alert-dialog';
import { mockUsers } from '../../data/mockData';
import type { User } from '../../data/mockData';
import { toast } from 'sonner';

export default function AdminUsers() {
  const [users, setUsers] = useState(mockUsers);

  const handleBlock = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'active' ? 'blocked' as const : 'active' as const }
        : u
    ));
    toast.success('Статус пользователя обновлён');
  };

  const handleDelete = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
    toast.success('Пользователь успешно удалён');
  };

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'platinum': return 'bg-gray-400';
      case 'gold': return 'bg-yellow-500';
      case 'silver': return 'bg-gray-300';
      default: return 'bg-orange-600';
    }
  };

  const getRankName = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'platinum': return 'Платина';
      case 'gold': return 'Золото';
      case 'silver': return 'Серебро';
      default: return 'Бронза';
    }
  };

  const getStatusName = (status: string) => {
    return status === 'active' ? 'Активен' : 'Заблокирован';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl">Управление пользователями</h2>
        <p className="text-gray-600">Управляйте пользователями и их правами</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего пользователей</p>
                <p className="text-2xl">{users.length}</p>
              </div>
              <Shield className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Активные пользователи</p>
                <p className="text-2xl">{users.filter(u => u.status === 'active').length}</p>
              </div>
              <ShieldCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Заблокированные</p>
                <p className="text-2xl">{users.filter(u => u.status === 'blocked').length}</p>
              </div>
              <Ban className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Новых за месяц</p>
                <p className="text-2xl">24</p>
              </div>
              <Mail className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input placeholder="Поиск по имени, email или имени пользователя..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="blocked">Заблокированные</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все ранги</SelectItem>
                <SelectItem value="platinum">Платина</SelectItem>
                <SelectItem value="gold">Золото</SelectItem>
                <SelectItem value="silver">Серебро</SelectItem>
                <SelectItem value="bronze">Бронза</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Пользователь</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Местоположение</TableHead>
                <TableHead>Ранг</TableHead>
                <TableHead>Рейтинг</TableHead>
                <TableHead>Очки</TableHead>
                <TableHead>Событий</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.fullName} />
                        <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.fullName}</p>
                        <p className="text-sm text-gray-600">@{user.username}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.city}, {user.country}</TableCell>
                  <TableCell>
                    <Badge className={getRankColor(user.rank)}>
                      {getRankName(user.rank)}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.rating.toFixed(1)}</TableCell>
                  <TableCell>{user.totalPoints}</TableCell>
                  <TableCell>{user.completedEvents}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                      {getStatusName(user.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant={user.status === 'active' ? 'outline' : 'default'}
                        onClick={() => handleBlock(user.id)}
                      >
                        <Ban className="h-4 w-4 mr-1" />
                        {user.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Удалить пользователя</AlertDialogTitle>
                            <AlertDialogDescription>
                              Вы уверены, что хотите удалить {user.fullName}? Это действие необратимо.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(user.id)}>
                              Удалить
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}