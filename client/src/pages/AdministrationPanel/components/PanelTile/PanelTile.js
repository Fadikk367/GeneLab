import React from 'react';

import { BlockLink } from 'common/components';
import { Tile, TileHeader, TileContent } from './PanelTile.css';


const PanelTile = ({ panelName, link }) => {
  return (
    <BlockLink to={link}>
      <Tile>
        <TileHeader>{panelName}</TileHeader>
        <TileContent>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, veniam ratione qui incidunt inventore eos.</p>
        </TileContent>
      </Tile>
    </BlockLink>
  )
}

export default PanelTile
