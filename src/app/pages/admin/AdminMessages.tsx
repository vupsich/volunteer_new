import { useState } from 'react';
import { Send, Search, Inbox, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { mockMessages, mockUsers } from '../../data/mockData';
import { toast } from 'sonner';

export default function AdminMessages() {
  const [selectedMessage, setSelectedMessage] = useState(mockMessages[0]);
  const [replyText, setReplyText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const [broadcastText, setBroadcastText] = useState('');

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast.error('Пожалуйста, введите сообщение');
      return;
    }
    toast.success('Ответ отправлен');
    setReplyText('');
  };

  const handleBroadcast = () => {
    if (!broadcastText.trim()) {
      toast.error('Пожалуйста, введите сообщение');
      return;
    }
    toast.success(`Рассылка отправлена ${mockUsers.length} пользователям`);
    setBroadcastText('');
    setBroadcastOpen(false);
  };

  const getSender = (senderId: string) => {
    return mockUsers.find(u => u.id === senderId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Система сообщений</h2>
          <p className="text-gray-600">Управляйте сообщениями пользователей и отправляйте рассылки</p>
        </div>
        <Button onClick={() => setBroadcastOpen(true)}>
          <Send className="mr-2 h-4 w-4" />
          Рассылка
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего сообщений</p>
                <p className="text-2xl">{mockMessages.length}</p>
              </div>
              <Inbox className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Непрочитанные</p>
                <p className="text-2xl">{mockMessages.filter(m => !m.read).length}</p>
              </div>
              <Badge className="bg-blue-500">{mockMessages.filter(m => !m.read).length}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Прочитанные</p>
                <p className="text-2xl">{mockMessages.filter(m => m.read).length}</p>
              </div>
              <Badge variant="outline">{mockMessages.filter(m => m.read).length}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Сегодня</p>
                <p className="text-2xl">12</p>
              </div>
              <Send className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages Interface */}
      <div className="grid lg:grid-cols-[1fr,2fr] gap-6">
        {/* Message List */}
        <Card>
          <CardHeader>
            <CardTitle>Сообщения</CardTitle>
            <div className="flex gap-2 mt-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input placeholder="Поиск сообщений..." className="pl-10" />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="unread">Непрочитанные</SelectItem>
                  <SelectItem value="read">Прочитанные</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockMessages
                .filter(m => filterStatus === 'all' || (filterStatus === 'unread' ? !m.read : m.read))
                .map((message) => {
                  const sender = getSender(message.senderId);
                  return (
                    <div
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedMessage?.id === message.id
                          ? 'bg-blue-50 border border-blue-200'
                          : !message.read
                          ? 'bg-blue-50/50 hover:bg-blue-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={sender?.avatar} />
                            <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                          </Avatar>
                          <p className="font-medium">{message.senderName}</p>
                        </div>
                        {!message.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{message.content}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        {/* Message Detail & Reply */}
        <Card>
          <CardHeader>
            <CardTitle>Детали сообщения</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedMessage ? (
              <>
                {/* Message Header */}
                <div className="flex items-start gap-4 pb-6 border-b">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={getSender(selectedMessage.senderId)?.avatar} />
                    <AvatarFallback>{selectedMessage.senderName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold">{selectedMessage.senderName}</h3>
                      <Badge variant={selectedMessage.read ? 'outline' : 'default'}>
                        {selectedMessage.read ? 'Прочитано' : 'Не прочитано'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {getSender(selectedMessage.senderId)?.email}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(selectedMessage.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Message Content */}
                <div className="py-4">
                  <p className="text-gray-700">{selectedMessage.content}</p>
                </div>

                {/* Reply Section */}
                <div className="space-y-4 pt-6 border-t">
                  <h4 className="font-medium">Ответить {selectedMessage.senderName}</h4>
                  <Textarea
                    placeholder="Введите ваш ответ..."
                    rows={6}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSendReply} className="flex-1">
                      <Send className="mr-2 h-4 w-4" />
                      Отправить ответ
                    </Button>
                    <Button variant="outline">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Удалить
                    </Button>
                  </div>
                </div>

                {/* User Info */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <h4 className="font-medium mb-3">Информация о пользователе</h4>
                  {(() => {
                    const sender = getSender(selectedMessage.senderId);
                    return sender ? (
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600">Имя пользователя</p>
                          <p className="font-medium">@{sender.username}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Ранг</p>
                          <Badge className="bg-yellow-500">{sender.rank}</Badge>
                        </div>
                        <div>
                          <p className="text-gray-600">Всего очков</p>
                          <p className="font-medium">{sender.totalPoints}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Событий</p>
                          <p className="font-medium">{sender.completedEvents}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-600">Местоположение</p>
                          <p className="font-medium">{sender.city}, {sender.country}</p>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              </>
            ) : (
              <div className="h-[500px] flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Inbox className="h-12 w-12 mx-auto mb-2" />
                  <p>Выберите сообщение для просмотра деталей</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Broadcast Dialog */}
      <Dialog open={broadcastOpen} onOpenChange={setBroadcastOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Рассылка сообщений</DialogTitle>
            <DialogDescription>
              Отправить сообщение всем пользователям
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Введите ваше сообщение..."
            rows={6}
            value={broadcastText}
            onChange={(e) => setBroadcastText(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setBroadcastOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleBroadcast}>
              <Send className="mr-2 h-4 w-4" />
              Отправить рассылку
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}