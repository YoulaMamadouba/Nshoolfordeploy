'use client';
import React, { useState } from 'react';
import DashboardHeader from '@/components/dashboardNschool/Header';
import Sidebar from '@/components/dashboardNschool/Sidebar';
import Overview from '@/components/dashboardNschool/overview';
import ManageTenants from '@/components/dashboardNschool/ManageTenants';
import PlansManagement from '@/components/dashboardNschool/Abonnements/PlansManagement';
import PaymentsManagement from '@/components/dashboardNschool/Paiements/PaymentsManagement';
import DomainManage from '@/components/dashboardNschool/DomainManage/DomainManage';
import CodePromo from '@/components/dashboardNschool/CodePromo';
import GlobalUsersPage from '@/components/dashboardNschool/GlobalUsers/GlobalUsersPage';

type CurrentView = 'overview' | 'tenants' | 'plans' | 'payments' | 'domains' | 'codePromo' | 'globalUsers';

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<CurrentView>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleNavigation = (view: CurrentView) => {
    setCurrentView(view);
  };

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar onNavigation={handleNavigation} onCollapseChange={handleSidebarCollapse} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <DashboardHeader isSidebarCollapsed={isSidebarCollapsed} />

        {/* Main Content */}
        <main className={`flex-1 pt-8 bg-gray-50 overflow-hidden transition-all duration-300 ${
          isSidebarCollapsed ? 'pl-16' : 'pl-64'
        }`}>
          <div className="h-full overflow-y-auto overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              {/* Content based on current view */}
              {currentView === 'overview' && <Overview />}
              {currentView === 'tenants' && <ManageTenants />}
              {currentView === 'plans' && <PlansManagement onBack={() => setCurrentView('overview')} />}
              {currentView === 'payments' && <PaymentsManagement onBack={() => setCurrentView('overview')} />}
              {currentView === 'domains' && <DomainManage />}
              {currentView === 'codePromo' && <CodePromo />}
              {currentView === 'globalUsers' && <GlobalUsersPage />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}