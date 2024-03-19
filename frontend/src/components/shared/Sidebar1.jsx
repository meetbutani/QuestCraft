import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames'
import { FcBullish } from 'react-icons/fc';
import { DASHBOARD_SIDEBAR_SETTINGS_LINKS, DASHBOARD_SIDEBAR_LINKS_1,DASHBOARD_LINK } from '../../../lib/constants';
import SubMenu from './SubMenu';

const linkClass =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

const Sidebar1 = () => {
  return (
    <div className="bg-background w-60 p-3 flex flex-col">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcBullish fontSize={24} />
        <span className="text-txtcol-900 text-lg">OpenShop</span>
      </div>
      <div className=" flex flex-col gap-0.5">
        {DASHBOARD_LINK.map((item,index) => (
          <SubMenu item={item} key={index} />
        ))}
      </div>
      <div className="bg-secondry py-3 pt-3"> 
        <div className="text-center text-white w-full">QPG MENU</div>
      </div>
      <div className=" flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS_1.map((item,index) => (
          <SubMenu item={item} key={index} />
        ))}
      </div>
      <div className="bg-secondry py-3 pt-4"> 
        <div className="text-center text-white w-full">SETTINGS</div> 
      </div>
      
      <div className="flex flex-col gap-0.5  border-neutral-700">
        {DASHBOARD_SIDEBAR_SETTINGS_LINKS.map((item,index) => (
          <SubMenu item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

function SidebarLink({ link }) {
  const {pathname} = useLocation();
  return (
    <Link to={link.path} className={classNames(pathname === link.path ? 'text-white' : '', linkClass)}>
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}

export default Sidebar1;
