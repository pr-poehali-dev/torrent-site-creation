import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Torrent {
  id: number;
  title: string;
  category: string;
  size: string;
  seeders: number;
  leechers: number;
  uploaded: string;
  uploader: string;
  rating: number;
  downloads: number;
}

interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
  rating: number;
  date: string;
}

const categories = ['Все', 'Фильмы', 'Сериалы', 'Игры', 'Музыка', 'ПО', 'Книги', 'Аниме'];

const mockTorrents: Torrent[] = [
  {
    id: 1,
    title: 'Новый Фильм 2026 4K HDR',
    category: 'Фильмы',
    size: '45.2 GB',
    seeders: 1250,
    leechers: 340,
    uploaded: '2 часа назад',
    uploader: 'MovieMaster',
    rating: 4.8,
    downloads: 12500
  },
  {
    id: 2,
    title: 'Популярный Сериал S05E10 [1080p]',
    category: 'Сериалы',
    size: '2.1 GB',
    seeders: 890,
    leechers: 120,
    uploaded: '5 часов назад',
    uploader: 'SeriesKing',
    rating: 4.9,
    downloads: 8900
  },
  {
    id: 3,
    title: 'Топовая AAA Игра 2026 + DLC',
    category: 'Игры',
    size: '87.5 GB',
    seeders: 2100,
    leechers: 550,
    uploaded: '1 день назад',
    uploader: 'GameLord',
    rating: 4.7,
    downloads: 25000
  },
  {
    id: 4,
    title: 'Новый Альбом Исполнителя [FLAC]',
    category: 'Музыка',
    size: '850 MB',
    seeders: 450,
    leechers: 80,
    uploaded: '3 часа назад',
    uploader: 'MusicFan',
    rating: 4.6,
    downloads: 5600
  },
  {
    id: 5,
    title: 'Adobe Creative Cloud 2026 Full',
    category: 'ПО',
    size: '12.4 GB',
    seeders: 3200,
    leechers: 890,
    uploaded: '6 часов назад',
    uploader: 'SoftPro',
    rating: 4.9,
    downloads: 45000
  },
  {
    id: 6,
    title: 'Бестселлер 2026 [FB2, EPUB, PDF]',
    category: 'Книги',
    size: '15 MB',
    seeders: 120,
    leechers: 25,
    uploaded: '1 день назад',
    uploader: 'BookWorm',
    rating: 4.5,
    downloads: 3400
  }
];

const mockComments: Comment[] = [
  {
    id: 1,
    user: 'TechGuru',
    avatar: '',
    text: 'Отличная раздача! Все файлы на месте, качество супер. Спасибо за труд!',
    rating: 5,
    date: '2 часа назад'
  },
  {
    id: 2,
    user: 'MovieFan88',
    avatar: '',
    text: 'Качество видео и звука на высоте. Скачал быстро, сиды активные.',
    rating: 5,
    date: '5 часов назад'
  },
  {
    id: 3,
    user: 'UserName',
    avatar: '',
    text: 'Работает отлично, никаких проблем не возникло.',
    rating: 4,
    date: '1 день назад'
  }
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTorrent, setSelectedTorrent] = useState<Torrent | null>(null);

  const filteredTorrents = mockTorrents.filter(torrent => {
    const matchesCategory = selectedCategory === 'Все' || torrent.category === selectedCategory;
    const matchesSearch = torrent.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Фильмы': 'Film',
      'Сериалы': 'Tv',
      'Игры': 'Gamepad2',
      'Музыка': 'Music',
      'ПО': 'Package',
      'Книги': 'BookOpen',
      'Аниме': 'Sparkles'
    };
    return icons[category] || 'Folder';
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Icon name="Zap" className="text-primary" size={32} />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  TorrentHub
                </h1>
              </div>
            </div>

            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Поиск торрентов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Icon name="User" size={20} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Профиль пользователя</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-20 h-20">
                        <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                          U
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">UserName</h3>
                        <p className="text-sm text-muted-foreground">Участник с января 2024</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">142</p>
                        <p className="text-xs text-muted-foreground">Скачано</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-secondary">28</p>
                        <p className="text-xs text-muted-foreground">Загружено</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-accent">4.8</p>
                        <p className="text-xs text-muted-foreground">Рейтинг</p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button>
                <Icon name="Upload" size={18} className="mr-2" />
                Загрузить
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="flex-shrink-0"
            >
              {category !== 'Все' && <Icon name={getCategoryIcon(category)} size={16} className="mr-2" />}
              {category}
            </Button>
          ))}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              {selectedCategory === 'Все' ? 'Все торренты' : selectedCategory}
            </h2>
            <p className="text-sm text-muted-foreground">
              Найдено: {filteredTorrents.length}
            </p>
          </div>

          <div className="grid gap-4">
            {filteredTorrents.map((torrent) => (
              <Card key={torrent.id} className="overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Icon name={getCategoryIcon(torrent.category)} size={14} />
                          {torrent.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="text-accent fill-accent" />
                          <span className="text-sm font-semibold">{torrent.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold hover:text-primary cursor-pointer">
                        {torrent.title}
                      </h3>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="lg" onClick={() => setSelectedTorrent(torrent)}>
                          <Icon name="Download" size={18} className="mr-2" />
                          Скачать
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh]">
                        <DialogHeader>
                          <DialogTitle>{selectedTorrent?.title}</DialogTitle>
                        </DialogHeader>
                        <Tabs defaultValue="info" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="info">Информация</TabsTrigger>
                            <TabsTrigger value="comments">Комментарии ({mockComments.length})</TabsTrigger>
                          </TabsList>
                          <TabsContent value="info" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                              <div>
                                <p className="text-sm text-muted-foreground">Размер</p>
                                <p className="text-lg font-semibold">{selectedTorrent?.size}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Категория</p>
                                <p className="text-lg font-semibold">{selectedTorrent?.category}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Сиды</p>
                                <p className="text-lg font-semibold text-secondary">{selectedTorrent?.seeders}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Личи</p>
                                <p className="text-lg font-semibold text-destructive">{selectedTorrent?.leechers}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Загружено</p>
                                <p className="text-lg font-semibold">{selectedTorrent?.uploaded}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Автор</p>
                                <p className="text-lg font-semibold">{selectedTorrent?.uploader}</p>
                              </div>
                            </div>
                            <Button className="w-full" size="lg">
                              <Icon name="Download" size={20} className="mr-2" />
                              Скачать торрент-файл
                            </Button>
                          </TabsContent>
                          <TabsContent value="comments">
                            <ScrollArea className="h-[400px] pr-4">
                              <div className="space-y-4">
                                {mockComments.map((comment) => (
                                  <Card key={comment.id}>
                                    <CardContent className="pt-4">
                                      <div className="flex gap-3">
                                        <Avatar>
                                          <AvatarFallback className="bg-primary text-primary-foreground">
                                            {comment.user[0]}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                          <div className="flex items-center justify-between mb-1">
                                            <p className="font-semibold">{comment.user}</p>
                                            <div className="flex items-center gap-1">
                                              {Array.from({ length: comment.rating }).map((_, i) => (
                                                <Icon key={i} name="Star" size={14} className="text-accent fill-accent" />
                                              ))}
                                            </div>
                                          </div>
                                          <p className="text-sm text-muted-foreground mb-2">{comment.date}</p>
                                          <p className="text-sm">{comment.text}</p>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </ScrollArea>
                            <div className="mt-4 flex gap-2">
                              <Input placeholder="Написать комментарий..." />
                              <Button>
                                <Icon name="Send" size={18} />
                              </Button>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Icon name="HardDrive" size={16} className="text-muted-foreground" />
                      <span>{torrent.size}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="ArrowUp" size={16} className="text-secondary" />
                      <span className="text-secondary font-semibold">{torrent.seeders}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="ArrowDown" size={16} className="text-destructive" />
                      <span className="text-destructive font-semibold">{torrent.leechers}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="Download" size={16} className="text-muted-foreground" />
                      <span>{torrent.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 py-2 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1.5">
                      <Icon name="User" size={14} />
                      <span>{torrent.uploader}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="Clock" size={14} />
                      <span>{torrent.uploaded}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
