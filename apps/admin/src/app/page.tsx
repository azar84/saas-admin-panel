'use client';

import { useState } from 'react';
import { AdminLayout, SidebarItem } from '@saas-admin/ui';
import { Button, Card, CardBody, CardHeader, Badge } from '@saas-admin/ui';
import { useRouter } from 'next/navigation';

// Sample sidebar items with proper routing
const sidebarItems: SidebarItem[] = [
  {
    id: '/',
    label: 'Dashboard',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    id: '/design-system',
    label: 'Design System',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: '/users',
    label: 'Users',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    badge: '1.2k',
  },
  {
    id: '/analytics',
    label: 'Analytics',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    id: '/settings',
    label: 'Settings',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const [activeItem, setActiveItem] = useState('/');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();

  const handleSidebarItemClick = (item: SidebarItem) => {
    setActiveItem(item.id);
    router.push(item.id);
  };

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <AdminLayout
      sidebarItems={sidebarItems}
      activeItem={activeItem}
      onSidebarItemClick={handleSidebarItemClick}
      sidebarCollapsed={sidebarCollapsed}
      onSidebarToggle={handleSidebarToggle}
      header={{
        title: 'Dashboard',
        subtitle: 'Welcome to your SaaS admin panel',
        actions: (
          <Button variant="primary">
            Create New
          </Button>
        ),
      }}
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-body leading-tight tracking-wide">Customers</p>
                  <p className="text-2xl font-semibold text-heading leading-normal tracking-normal">320</p>
                  <p className="text-xs text-placeholder leading-relaxed tracking-tight">During 2 Month</p>
                </div>
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-warning to-secondary flex items-center justify-center">
                    <span className="text-btn-text font-semibold text-sm">75%</span>
                  </div>
                  <div className="absolute inset-0 rounded-full border-4 border-medium"></div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-body leading-tight tracking-wide">Orders</p>
                  <p className="text-2xl font-semibold text-heading leading-normal tracking-normal">500</p>
                  <p className="text-xs text-placeholder leading-relaxed tracking-tight">During 1 Month</p>
                </div>
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center">
                    <span className="text-btn-text font-semibold text-sm">65%</span>
                  </div>
                  <div className="absolute inset-0 rounded-full border-4 border-medium"></div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-body leading-tight tracking-wide">Cancel</p>
                  <p className="text-2xl font-semibold text-heading leading-normal tracking-normal">20</p>
                  <p className="text-xs text-placeholder leading-relaxed tracking-tight">During 3 Month</p>
                </div>
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-warning to-secondary flex items-center justify-center">
                    <span className="text-btn-text font-semibold text-sm">35%</span>
                  </div>
                  <div className="absolute inset-0 rounded-full border-4 border-medium"></div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-body leading-tight tracking-wide">Today Best Sale</p>
                  <p className="text-lg font-semibold text-heading leading-normal tracking-normal">Diamond T-Shirt</p>
                  <p className="text-xs text-placeholder leading-relaxed tracking-tight">120 Sales</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-accent-1 flex items-center justify-center">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Report */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-heading">Revenue Report</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-secondary rounded"></div>
                      <span className="text-sm text-body">Earning</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-warning rounded"></div>
                      <span className="text-sm text-body">Expenses</span>
                    </div>
                  </div>
                  <div className="h-64 bg-bg-tertiary rounded-lg flex items-end justify-between p-4">
                    {/* Simplified bar chart */}
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                      <div key={month} className="flex flex-col items-center space-y-2">
                        <div className="flex flex-col space-y-1">
                          <div 
                            className="w-6 bg-secondary rounded-t" 
                            style={{ height: `${Math.random() * 100 + 50}px` }}
                          ></div>
                          <div 
                            className="w-6 bg-warning rounded-t" 
                            style={{ height: `${Math.random() * 60 + 30}px` }}
                          ></div>
                        </div>
                        <span className="text-xs text-placeholder">{month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Latest Customer */}
          <Card>
            <CardHeader>
                              <h3 className="text-lg font-semibold text-heading">Latest Customer</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-bg-tertiary flex items-center justify-center">
                      <span className="text-sm font-medium text-body">HJ</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-heading">Harry Joe</p>
                      <p className="text-xs text-placeholder">20 Purchases | 120 Likes</p>
                    </div>
                  </div>
                  <svg className="h-5 w-5 text-placeholder" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-bg-tertiary flex items-center justify-center">
                      <span className="text-sm font-medium text-body">MJ</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-heading">Martha June</p>
                      <p className="text-xs text-placeholder">10 Purchases | 140 Likes</p>
                    </div>
                  </div>
                  <svg className="h-5 w-5 text-placeholder" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-bg-tertiary flex items-center justify-center">
                      <span className="text-sm font-medium text-body">MC</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-heading">Michal Clerk</p>
                      <p className="text-xs text-placeholder">30 Purchases | 160 Likes</p>
                    </div>
                  </div>
                  <svg className="h-5 w-5 text-placeholder" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-heading">Recent Orders</h3>
                  <Button variant="ghost" size="sm">
                    See All
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {[
                    { name: 'Smart Watch', time: '2 minutes ago', price: '$50' },
                    { name: 'Phone Lenses', time: '3 minutes ago', price: '$30' },
                    { name: 'Minimalist Wallet', time: '8 minutes ago', price: '$28' },
                    { name: 'Car Vacuum', time: '15 minutes ago', price: '$90' },
                  ].map((order, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-lg bg-bg-secondary flex items-center justify-center">
                          <svg className="h-5 w-5 text-body" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-heading">{order.name}</p>
                          <p className="text-xs text-placeholder">{order.time}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-heading">{order.price}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Trending Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-heading">Trending Items</h3>
                <Button variant="ghost" size="sm">
                  See All
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {[
                  { name: 'Laptop Batteries', rating: 5, stock: 'In stock > 500', price: '$40' },
                  { name: 'Wireless Charger', rating: 4, stock: 'In stock < 100', price: '$30' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                                              <div className="h-10 w-10 rounded-lg bg-bg-secondary flex items-center justify-center">
                          <svg className="h-5 w-5 text-body" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-heading">{item.name}</p>
                        <div className="flex items-center space-x-1">
                          {[...Array(item.rating)].map((_, i) => (
                            <svg key={i} className="h-3 w-3 text-warning" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-xs text-placeholder">{item.stock}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-heading">{item.price}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Profit Increase */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-heading">Profit Increase</h3>
            </CardHeader>
            <CardBody>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-r from-secondary to-warning flex items-center justify-center">
                    <span className="text-btn-text font-bold text-2xl">70%</span>
                  </div>
                  <div className="absolute inset-0 rounded-full border-8 border-medium"></div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
} 