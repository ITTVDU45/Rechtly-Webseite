'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Truck, 
  AlertCircle, 
  Award, 
  BookOpen, 
  Edit3, 
  Users, 
  Mail, 
  MessageCircle, 
  HelpCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  description: string;
  isHighlighted?: boolean;
}

interface MegaMenuProps {
  type: 'leistungen' | 'magazin' | 'unternehmen';
  isOpen: boolean;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ type, isOpen }) => {
  const menuContent: Record<string, { title: string; items: MenuItem[] }> = {
    leistungen: {
      title: 'Unsere Leistungen',
      items: [
        { 
          name: 'KFZ-Gutachten', 
          path: '/kfzgutachten', 
          icon: <FileText className="w-5 h-5" />,
          description: 'Professionelle KFZ-Gutachten nach Unfällen'
        },
        { 
          name: 'Verkehrsunfall', 
          path: '/verkehrsunfall', 
          icon: <Truck className="w-5 h-5" />,
          description: 'Kompetente Unterstützung bei Verkehrsunfällen'
        },
        { 
          name: 'Bußgeld', 
          path: '/bussgeld', 
          icon: <AlertCircle className="w-5 h-5" />,
          description: 'Einspruch gegen Bußgeldbescheide einlegen'
        }
      ]
    },
    magazin: {
      title: 'Rechtswissen & Aktuelles',
      items: [
        { 
          name: 'Blog', 
          path: '/blog', 
          icon: <Edit3 className="w-5 h-5" />,
          description: 'Aktuelle Beiträge'
        },
        { 
          name: 'Ratgeber', 
          path: '/ratgeber', 
          icon: <BookOpen className="w-5 h-5" />,
          description: 'Hilfreiche Tipps'
        }
      ]
    },
    unternehmen: {
      title: 'Über Rechtly',
      items: [
        { 
          name: 'Über uns', 
          path: '/ueber-uns', 
          icon: <Users className="w-5 h-5" />,
          description: 'Lernen Sie uns kennen'
        },
        { 
          name: 'Kontakt', 
          path: '/kontakt', 
          icon: <Mail className="w-5 h-5" />,
          description: 'So erreichen Sie uns'
        },
        { 
          name: '24/7 Chat', 
          path: '#chat', 
          icon: <MessageCircle className="w-5 h-5" />,
          description: 'Direkter Support',
          isHighlighted: true
        },
        { 
          name: 'FAQ', 
          path: '/faq', 
          icon: <HelpCircle className="w-5 h-5" />,
          description: 'Häufig gestellte Fragen'
        },
        {
          name: 'Für Kfz Gutachter',
          path: '/fuer-kfz-gutachter',
          icon: <HelpCircle className="w-5 h-5" />,
          description: 'Informationen für Kfz Gutachter'
        }
      ]
    }
  };

  const content = menuContent[type];
  if (!content) return null;

  return (
    <div className={cn(
      "absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-200 transform transition-all duration-300 z-50",
      isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
    )}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{content.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items.map((item, index) => (
            <Link 
              key={index} 
              href={item.path}
              className={cn(
                "group p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200",
                item.isHighlighted && "bg-gradient-to-r from-blue-50 to-green-50 border-blue-300"
              )}
            >
              <div className="flex items-start space-x-3">
                <div className="text-blue-600 group-hover:text-blue-700 transition-colors">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
