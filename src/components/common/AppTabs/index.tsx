import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { ETagSize } from '@/components/common/Tag';

type TabsProps = {
  label: string;
  to: string;
  disabled?: boolean;
  hidden?: boolean;
};

type Props = {
  tabs: TabsProps[];
  className?: string;
  tabLabelClass?: string;
  size?: ETagSize;
  level?: number;
};

const AppTabs = ({
  tabs,
  level = 0,
  className = '',
  tabLabelClass = '',
  size = ETagSize.lg,
}: Props) => {
  const { pathname } = useLocation();
  return (
    <Tab.Group>
      <Tab.List className={twMerge('flex space-x-4', className)}>
        {tabs
          .filter((tab) => !tab.hidden)
          .map((tab) => (
            <Tab
              className={twMerge(
                'focus:outline-none',
                tab.disabled && 'pointer-events-none !cursor-default opacity-30',
                size === ETagSize.sm && '!text-sm-semi-bold',
                tab.disabled && 'pointer-events-none !cursor-default opacity-30',
              )}
              key={tab.label}
            >
              <Link to={tab.to}>
                <span
                  className={twMerge(
                    'relative block border-b-2 border-transparent px-1 pb-3 !text-md-bold !leading-[unset] text-gray-500',
                    tabLabelClass && tabLabelClass,
                    pathname === tab.to && 'text-primary-700',
                  )}
                >
                  {pathname === tab.to && (
                    <motion.div
                      className="absolute bottom-[2px] left-0 right-0 h-[2px] rounded-lg bg-primary-700"
                      layoutId={'active-tab' + level + tab.to.split('/')[1]}
                    />
                  )}
                  {tab.label}
                </span>
              </Link>
            </Tab>
          ))}
      </Tab.List>
    </Tab.Group>
  );
};

export default AppTabs;
