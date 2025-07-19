import React from 'react';
import MenuCard from './MenuCard';

const MenuList = ({ menu }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {menu.map(item => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuList;
