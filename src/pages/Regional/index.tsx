import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import { getRegionStats } from '../../services/api';
import { RegionData } from '../../types';

// Fix Leaflet Marker Icon issue in React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25,41],
    iconAnchor: [12,41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export const RegionalInsights: React.FC = () => {
  const [regions, setRegions] = useState<RegionData[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRegionStats().then(data => {
      setRegions(data);
      setSelectedRegion(data[0]);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="w-full h-[500px] bg-slate-50 flex items-center justify-center rounded-3xl">
       <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-6 overflow-y-auto">
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Mission Hotspots</h3>
            <div className="space-y-2">
               {regions.map((region) => (
                  <button 
                     key={region.id}
                     onClick={() => setSelectedRegion(region)}
                     className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedRegion?.id === region.id 
                           ? 'bg-blue-600/5 border-blue-600' 
                           : 'border-transparent hover:bg-slate-50'
                     }`}
                  >
                     <p className="text-sm font-bold text-slate-800">{region.name}</p>
                     <p className="text-xs text-slate-500">{region.riskPercentage}% Risk</p>
                  </button>
               ))}
            </div>
         </div>
      </div>

      {/* Map View */}
      <div className="flex-1 relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white min-h-[400px]">
         {/* @ts-ignore */}
         <MapContainer 
            center={[20.5937, 78.9629]} 
            zoom={5} 
            className="w-full h-full"
         >
            {/* @ts-ignore */}
            <TileLayer
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {regions.map((region) => (
               /* @ts-ignore */
               <Circle 
                  key={region.id}
                  center={region.coordinates} 
                  radius={region.riskPercentage * 1000} 
                  pathOptions={{ 
                     color: region.riskPercentage > 50 ? '#EF4444' : '#10B981',
                     fillColor: region.riskPercentage > 50 ? '#EF4444' : '#10B981',
                     fillOpacity: 0.15,
                  }} 
               />
            ))}
         </MapContainer>
      </div>
    </div>
  );
};
