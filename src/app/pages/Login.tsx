import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - simulate authentication
    if (formData.username && formData.password) {
      login(formData.username, formData.password);
      toast.success('Вход выполнен успешно!');
      
      // Simulate admin login
      if (formData.username === 'admin') {
        setTimeout(() => navigate('/admin'), 500);
      } else {
        setTimeout(() => navigate('/dashboard'), 500);
      }
    } else {
      toast.error('Пожалуйста, заполните все поля');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white mb-6">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg"></div>
            <span className="text-2xl font-semibold">EventHub</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">С возвращением</CardTitle>
            <CardDescription>Войдите в свой аккаунт, чтобы продолжить</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Имя пользователя</Label>
                <Input
                  id="username"
                  placeholder="Введите ваше имя пользователя"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Введите ваш пароль"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Запомнить меня
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Забыли пароль?
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 mt-4">
              <Button type="submit" className="w-full">
                Войти
              </Button>
              <div className="text-center text-sm text-gray-600">
                Нет аккаунта?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Создать
                </Link>
              </div>
              <div className="text-xs text-center text-gray-500">
                Подсказка: используйте "admin" в качестве имени пользователя и пароля для доступа в панель администратора
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}