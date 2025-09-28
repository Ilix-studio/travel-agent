import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  User,
  Settings,
  LogOut,
  User2,
  User2Icon,
} from "lucide-react";
import { Link } from "react-router-dom";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Tours", href: "/tours" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const user = true;
  const isAuthenticated = true;

  const logout = () => {};

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200'>
      <div className='container mx-auto px-4'>
        {/* Main navigation */}
        <div className='flex items-center justify-between py-4'>
          {/* Logo */}
          <Link to='/' className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center'>
              <MapPin className='w-5 h-5 text-white' />
            </div>
            <div>
              <h1 className='text-xl font-bold text-slate-900'>WanderLux</h1>
              <p className='text-xs text-slate-600 hidden sm:block'>
                Travel Agency
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-8'>
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className='text-slate-700 hover:text-amber-600 font-medium transition-colors'
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className='hidden md:flex items-center gap-4'>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='flex items-center gap-2'>
                    <Avatar className='w-8 h-8'>
                      <AvatarImage src='/placeholder.svg' />
                      <AvatarFallback>
                        <User2Icon />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                  <DropdownMenuItem>
                    <User className='w-4 h-4 mr-2' />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className='w-4 h-4 mr-2' />
                    Settings
                  </DropdownMenuItem>
                  {user && (
                    <DropdownMenuItem asChild>
                      <Link to='/admin'>
                        <Settings className='w-4 h-4 mr-2' />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className='w-4 h-4 mr-2' />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant='outline' size='sm' asChild>
                  <Link to='/auth'>Sign In</Link>
                </Button>
                <Button
                  size='sm'
                  className='bg-amber-500 hover:bg-amber-600 text-black'
                  asChild
                >
                  <Link to='/booking'>Book Now</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className='md:hidden'>
              <Button variant='ghost' size='sm'>
                <Menu className='w-5 h-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
              <div className='flex flex-col h-full'>
                {/* Mobile Header */}
                <div className='flex items-center justify-between pb-4 border-b'>
                  <div className='flex items-center gap-2'>
                    <div className='w-6 h-6 bg-amber-500 rounded-md flex items-center justify-center'>
                      <MapPin className='w-4 h-4 text-white' />
                    </div>
                    <span className='font-bold text-slate-900'>WanderLux</span>
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setIsOpen(false)}
                  >
                    <X className='w-5 h-5' />
                  </Button>
                </div>

                {/* Mobile User Info */}
                {isAuthenticated && (
                  <div className='flex items-center gap-3 py-4 border-b'>
                    <Avatar className='w-10 h-10'>
                      <AvatarImage src='/placeholder.svg' />
                      <AvatarFallback>
                        <User2 />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      {/* <p className='font-medium'>
                      
                      </p>
                      <p className='text-sm text-slate-600'>{user?.email}</p> */}
                    </div>
                  </div>
                )}

                {/* Mobile Navigation */}
                <nav className='flex flex-col gap-4 py-6'>
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className='text-lg font-medium text-slate-700 hover:text-amber-600 transition-colors py-2'
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {isAuthenticated && user && (
                    <Link
                      to='/admin'
                      className='text-lg font-medium text-slate-700 hover:text-amber-600 transition-colors py-2'
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </nav>

                {/* Mobile Contact Info & Auth */}
                <div className='mt-auto space-y-4 pt-6 border-t'>
                  <div className='flex items-center gap-3 text-sm text-slate-600'>
                    <Phone className='w-4 h-4' />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className='flex items-center gap-3 text-sm text-slate-600'>
                    <Mail className='w-4 h-4' />
                    <span>info@wanderlux.com</span>
                  </div>

                  {/* Mobile Auth Buttons */}
                  <div className='flex flex-col gap-3 pt-4'>
                    {isAuthenticated ? (
                      <Button
                        variant='outline'
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className='w-4 h-4 mr-2' />
                        Sign Out
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant='outline'
                          asChild
                          onClick={() => setIsOpen(false)}
                        >
                          <Link to='/auth'>Sign In</Link>
                        </Button>
                        <Button
                          className='bg-amber-500 hover:bg-amber-600 text-black'
                          asChild
                          onClick={() => setIsOpen(false)}
                        >
                          <Link to='/booking'>Book Now</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
