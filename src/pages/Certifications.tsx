import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Badge as BadgeIcon, Scroll, Download, Share2, Star, Trophy, Linkedin, Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DarkModeToggle from '@/components/DarkModeToggle';
import BlurImage from '@/components/ui/BlurImage';

// Mock achievement data
const mockCertificates = [
  {
    id: "cert-1",
    title: "Algorithm Master",
    description: "Completed all algorithm challenges with excellence",
    earnedDate: "2023-11-10",
    imageUrl: "https://via.placeholder.com/400x300?text=Algorithm+Master",
    category: "course"
  },
  {
    id: "cert-2",
    title: "Data Structures Pro",
    description: "Demonstrated proficiency in all data structure challenges",
    earnedDate: "2023-09-15",
    imageUrl: "https://via.placeholder.com/400x300?text=Data+Structures+Pro",
    category: "course"
  },
  {
    id: "cert-3",
    title: "October Coding Challenge Winner",
    description: "Finished 1st place in the October coding contest",
    earnedDate: "2023-10-31",
    imageUrl: "https://via.placeholder.com/400x300?text=Contest+Winner",
    category: "contest"
  }
];

const mockBadges = [
  {
    id: "badge-1",
    title: "100 Problems Solved",
    description: "Successfully solved 100 coding challenges",
    earnedDate: "2023-11-01",
    icon: <Trophy className="h-8 w-8" />,
    color: "bg-amber-500"
  },
  {
    id: "badge-2",
    title: "Streak Master",
    description: "Maintained a 30-day coding streak",
    earnedDate: "2023-10-15",
    icon: <Star className="h-8 w-8" />,
    color: "bg-blue-500"
  },
  {
    id: "badge-3",
    title: "Speed Demon",
    description: "Solved a hard problem in under 10 minutes",
    earnedDate: "2023-09-22",
    icon: <Award className="h-8 w-8" />,
    color: "bg-green-500"
  },
  {
    id: "badge-4",
    title: "Memory Optimizer",
    description: "Created the most memory-efficient solution",
    earnedDate: "2023-08-30",
    icon: <BadgeIcon className="h-8 w-8" />,
    color: "bg-purple-500"
  },
  {
    id: "badge-5",
    title: "Bug Hunter",
    description: "Found and reported 5 bugs in problem statements",
    earnedDate: "2023-10-05",
    icon: <Award className="h-8 w-8" />,
    color: "bg-red-500"
  },
  {
    id: "badge-6",
    title: "Community Helper",
    description: "Helped 20+ users with their coding problems",
    earnedDate: "2023-11-12",
    icon: <Trophy className="h-8 w-8" />,
    color: "bg-teal-500"
  }
];

// Stats for milestones
const userStats = {
  problemsSolved: 127,
  contestsWon: 3,
  streak: 42,
  ranking: 156,
  totalPoints: 8750
};

const Certifications = () => {
  const { toast } = useToast();
  const [selectedCertificate, setSelectedCertificate] = React.useState(mockCertificates[0].id);

  const handleDownload = (certificateId: string) => {
    toast({
      title: "Certificate Downloaded",
      description: "Your certificate has been downloaded successfully.",
    });
  };

  const handleShare = (platform: 'linkedin' | 'github', certificateId: string) => {
    toast({
      title: `Shared on ${platform === 'linkedin' ? 'LinkedIn' : 'GitHub'}`,
      description: "Your achievement has been shared successfully.",
    });
  };

  const currentCertificate = mockCertificates.find(cert => cert.id === selectedCertificate);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto pt-16 px-4 pb-20">
        <div className="flex flex-col space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Your Achievements</h1>
            <DarkModeToggle className="ml-4" />
          </div>
          
          {/* User Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="bg-gradient-to-br from-primary/90 to-primary/70 text-primary-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{userStats.problemsSolved}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Problems Solved</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-500/90 to-amber-500/70 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{userStats.contestsWon}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Contests Won</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500/90 to-green-500/70 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{userStats.streak} days</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Current Streak</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500/90 to-blue-500/70 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">#{userStats.ranking}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Global Ranking</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500/90 to-purple-500/70 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{userStats.totalPoints}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Total Points</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="certificates" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
              <TabsTrigger value="certificates" className="text-lg">
                <Scroll className="mr-2 h-5 w-5" />
                Certificates
              </TabsTrigger>
              <TabsTrigger value="badges" className="text-lg">
                <BadgeIcon className="mr-2 h-5 w-5" />
                Badges
              </TabsTrigger>
            </TabsList>

            <TabsContent value="certificates" className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Certificates List */}
                <div className="lg:w-2/5">
                  <h2 className="text-2xl font-bold mb-4">Your Certificates</h2>
                  <div className="space-y-4">
                    {mockCertificates.map((cert) => (
                      <Card 
                        key={cert.id} 
                        className={`cursor-pointer transition-all hover:shadow-md ${selectedCertificate === cert.id ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setSelectedCertificate(cert.id)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle>{cert.title}</CardTitle>
                          <CardDescription>
                            Earned on {new Date(cert.earnedDate).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground">{cert.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Badge variant={cert.category === 'course' ? 'default' : 'secondary'}>
                            {cert.category === 'course' ? 'Course' : 'Contest'}
                          </Badge>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Certificate Preview */}
                <div className="lg:w-3/5">
                  <h2 className="text-2xl font-bold mb-4">Certificate Preview</h2>
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      {currentCertificate && (
                        <div className="flex flex-col items-center">
                          <div className="overflow-hidden rounded-lg border mb-4 w-full h-64 md:h-80">
                            <BlurImage 
                              src={currentCertificate.imageUrl} 
                              alt={currentCertificate.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="text-xl font-bold mt-2">{currentCertificate.title}</h3>
                          <p className="text-muted-foreground mt-1">{currentCertificate.description}</p>
                          <p className="text-sm mt-2">
                            Earned on {new Date(currentCertificate.earnedDate).toLocaleDateString()}
                          </p>
                          
                          <div className="flex flex-wrap justify-center gap-2 mt-6">
                            <Button onClick={() => handleDownload(currentCertificate.id)}>
                              <Download className="mr-2 h-4 w-4" />
                              Download Certificate
                            </Button>
                            <Button variant="outline" onClick={() => handleShare('linkedin', currentCertificate.id)}>
                              <Linkedin className="mr-2 h-4 w-4" />
                              Share on LinkedIn
                            </Button>
                            <Button variant="outline" onClick={() => handleShare('github', currentCertificate.id)}>
                              <Github className="mr-2 h-4 w-4" />
                              Share on GitHub
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="badges" className="space-y-6">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold mb-4">Your Achievements</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {mockBadges.map((badge) => (
                    <Card key={badge.id} className="overflow-hidden">
                      <div className={`${badge.color} p-6 flex justify-center items-center text-white`}>
                        {badge.icon}
                      </div>
                      <CardHeader>
                        <CardTitle>{badge.title}</CardTitle>
                        <CardDescription>
                          Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button variant="ghost" size="sm" onClick={() => handleShare('linkedin', badge.id)}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Upcoming Badges */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Upcoming Achievements</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <Card className="border-dashed border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BadgeIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">200 Problems Solved</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {userStats.problemsSolved}/200 problems solved
                      </p>
                      <div className="w-full bg-muted h-2 rounded-full mt-2">
                        <div 
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(userStats.problemsSolved / 200) * 100}%` }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Star className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">50-Day Streak</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {userStats.streak}/50 days streak
                      </p>
                      <div className="w-full bg-muted h-2 rounded-full mt-2">
                        <div 
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(userStats.streak / 50) * 100}%` }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Trophy className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">5 Contests Won</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {userStats.contestsWon}/5 contests won
                      </p>
                      <div className="w-full bg-muted h-2 rounded-full mt-2">
                        <div 
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(userStats.contestsWon / 5) * 100}%` }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Certifications;
