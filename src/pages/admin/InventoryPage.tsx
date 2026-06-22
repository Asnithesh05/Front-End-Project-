import React, { useState } from 'react';
import { 
  Box, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowUp, 
  ArrowDown, 
  AlertTriangle,
  ChevronRight,
  Package,
  Activity,
  ChevronDown,
  ChevronUp,
  Trash2,
  RefreshCcw,
  Clock,
  Truck,
  Calendar,
  MapPin,
  CheckSquare,
  Square,
  History,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InventoryItem } from '../../types/types';
import { INITIAL_INVENTORY } from '../../data/mockData';

export const InventoryPage = () => {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', stock: 0, unit: '', minStock: 0 });
  
  // New States
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' | null }>({ key: 'name', direction: 'asc' });
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Critical' | 'Stable'>('All');
  const [historyItem, setHistoryItem] = useState<InventoryItem | null>(null);

  const handleUpdateStock = (id: string, delta: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item
    ));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const item: InventoryItem = {
      ...newItem,
      id: Math.random().toString(36).substr(2, 9),
    };
    setItems(prev => [...prev, item]);
    setIsModalOpen(false);
    setNewItem({ name: '', stock: 0, unit: '', minStock: 0 });
  };

  const toggleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredItems.map(i => i.id));
    }
  };

  const handleBulkRestock = () => {
    setItems(prev => prev.map(item => 
      selectedIds.includes(item.id) ? { ...item, stock: item.minStock * 2 } : item
    ));
    setSelectedIds([]);
  };

  const handleBulkTerminate = () => {
    setItems(prev => prev.filter(item => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  const filteredItems = items
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const isCritical = item.stock <= item.minStock;
      if (statusFilter === 'Critical') return matchesSearch && isCritical;
      if (statusFilter === 'Stable') return matchesSearch && !isCritical;
      return matchesSearch;
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      const valA = a[sortConfig.key as keyof InventoryItem];
      const valB = b[sortConfig.key as keyof InventoryItem];
      
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortConfig.direction === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      }
      
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
      }
      
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-widest text-white uppercase flex items-center gap-3 italic">
              <Package className="text-orange-500" size={32} />
              Logistics & Assets
            </h1>
            <p className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mt-2">
              System Node: INVENTORY_MGMT_V5 // FULL_CONTROL_OVERRIDE
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-orange-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
          >
            <Plus size={18} strokeWidth={3} />
            Manifest Asset
          </button>
        </div>

        {/* Filters & Search & Status Controls */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="SEARCH ASSET DATABASE..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-xs font-mono tracking-widest focus:outline-none focus:border-orange-500/50 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <div className="p-1 bg-white/5 border border-white/10 rounded-xl flex gap-1">
                {(['All', 'Critical', 'Stable'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                      statusFilter === status 
                        ? 'bg-orange-500 text-black' 
                        : 'text-white/40 hover:bg-white/10'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <button className="px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <Filter size={18} className="text-white/40" />
              </button>
            </div>
          </div>

          {/* Bulk Action Bar */}
          <AnimatePresence>
            {selectedIds.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-2xl flex items-center justify-between shadow-[0_0_30px_rgba(249,115,22,0.1)]"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-orange-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                    {selectedIds.length} SELECTED
                  </div>
                  <span className="text-xs font-bold text-white/60">Executing Bulk Operational Directive</span>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={handleBulkRestock}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/10"
                  >
                    <RefreshCcw size={14} className="text-green-500" />
                    Bulk Restock
                  </button>
                  <button 
                    onClick={handleBulkTerminate}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500 hover:text-black text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-red-500/30 group"
                  >
                    <Trash2 size={14} className="group-hover:text-black" />
                    Bulk Terminate
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Data Table */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-6 w-12">
                  <button onClick={toggleSelectAll} className="text-white/20 hover:text-orange-500 transition-colors">
                    {selectedIds.length === filteredItems.length && filteredItems.length > 0 ? <CheckSquare size={18} /> : <Square size={18} />}
                  </button>
                </th>
                <th 
                  onClick={() => toggleSort('name')}
                  className="p-6 text-[10px] font-black tracking-[0.25em] text-white/30 uppercase cursor-pointer hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    Asset Name
                    {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                  </div>
                </th>
                <th 
                  onClick={() => toggleSort('stock')}
                  className="p-6 text-[10px] font-black tracking-[0.25em] text-white/30 uppercase text-center cursor-pointer hover:text-white transition-colors group"
                >
                  <div className="flex items-center justify-center gap-2">
                    Velocity / Stock
                    {sortConfig.key === 'stock' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                  </div>
                </th>
                <th className="p-6 text-[10px] font-black tracking-[0.25em] text-white/30 uppercase cursor-default">Status</th>
                <th className="p-6 text-[10px] font-black tracking-[0.25em] text-white/30 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const isCritical = item.stock <= item.minStock;
                const isExpanded = expandedIds.includes(item.id);
                const isSelected = selectedIds.includes(item.id);

                return (
                  <React.Fragment key={item.id}>
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer ${isExpanded ? 'bg-white/[0.01]' : ''}`}
                      onClick={() => toggleExpand(item.id)}
                    >
                      <td className="p-6" onClick={(e) => { e.stopPropagation(); toggleSelect(item.id); }}>
                        <button className={`${isSelected ? 'text-orange-500' : 'text-white/10 group-hover:text-white/30'} transition-colors`}>
                          {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                        </button>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-1 h-8 rounded-full ${isCritical ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-white/10'}`} />
                          <div>
                            <p className="font-bold tracking-wide text-sm flex items-center gap-2">
                              {item.name}
                              {isExpanded ? <ChevronUp size={12} className="text-white/20" /> : <ChevronDown size={12} className="text-white/20" />}
                            </p>
                            <p className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">UID: {item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleUpdateStock(item.id, -1); }}
                              className="p-1.5 hover:bg-orange-500/20 rounded-md transition-colors text-white/40 hover:text-orange-500"
                            >
                              <ArrowDown size={14} />
                            </button>
                            <span className={`text-xl font-black tabular-nums italic ${isCritical ? 'text-orange-500' : 'text-white'}`}>
                              {item.stock}
                              <span className="text-[10px] font-normal text-white/20 ml-1 uppercase not-italic">{item.unit}</span>
                            </span>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleUpdateStock(item.id, 1); }}
                              className="p-1.5 hover:bg-green-500/20 rounded-md transition-colors text-white/40 hover:text-green-400"
                            >
                              <ArrowUp size={14} />
                            </button>
                          </div>
                          <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${isCritical ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,1)]' : 'bg-green-400/50'}`}
                              style={{ width: `${Math.min(100, (item.stock / (item.minStock * 3)) * 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          {isCritical ? (
                            <div className="flex items-center gap-2 text-orange-500 animate-pulse">
                              <AlertTriangle size={14} />
                              <span className="text-[10px] font-black tracking-widest uppercase">Critical</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-green-400">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                              <span className="text-[10px] font-black tracking-widest uppercase text-white/60">Optimal</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setHistoryItem(item); }}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/20 hover:text-orange-500 group/hist"
                            title="View History"
                          >
                            <History size={16} />
                          </button>
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/20 hover:text-white">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>

                    {/* EXPANDED DETAILS */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-white/[0.012] border-b border-white/5"
                        >
                          <td colSpan={5} className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              <div className="space-y-3">
                                <div className="flex items-center gap-3 text-white/30">
                                  <Truck size={14} />
                                  <span className="text-[10px] font-black uppercase tracking-widest">Supplier Matrix</span>
                                </div>
                                <p className="text-sm font-bold text-white/80 italic">Global Logistics Core // Tier-1</p>
                                <p className="text-[10px] font-mono text-white/20">CONTRACT: {Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                              </div>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3 text-white/30">
                                  <Calendar size={14} />
                                  <span className="text-[10px] font-black uppercase tracking-widest">Restock Sync</span>
                                </div>
                                <p className="text-sm font-bold text-white/80 italic">Last Uplink: 02 MAY 2024</p>
                                <p className="text-[10px] font-mono text-white/20">SCHEDULED: 15 MAY 2024</p>
                              </div>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3 text-white/30">
                                  <MapPin size={14} />
                                  <span className="text-[10px] font-black uppercase tracking-widest">Location Node</span>
                                </div>
                                <p className="text-sm font-bold text-white/80 italic">HEARTH_STORAGE_F4</p>
                                <div className="flex gap-2">
                                  <span className="text-[9px] font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10 text-white/40">ZONE_ALPHA</span>
                                  <span className="text-[9px] font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10 text-white/40">SLOT_B12</span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
          
          {filteredItems.length === 0 && (
            <div className="p-20 text-center space-y-4">
              <div className="inline-flex p-4 bg-white/5 border border-white/10 rounded-full text-white/10 italic">
                <Box size={48} />
              </div>
              <p className="text-white/40 font-mono tracking-[0.3em] uppercase text-xs font-bold">No assets match current filter</p>
            </div>
          )}
        </div>

        {/* History Modal */}
        <AnimatePresence>
          {historyItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setHistoryItem(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 shadow-[0_0_100px_rgba(249,115,22,0.1)] rounded-3xl p-10"
              >
                <div className="flex justify-between items-center mb-8 pb-8 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                      <History className="text-orange-500" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black italic tracking-tighter uppercase">Asset Timeline</h2>
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mt-1">{historyItem.name} // UID: {historyItem.id}</p>
                    </div>
                  </div>
                  <button onClick={() => setHistoryItem(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/20 hover:text-white">
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6 relative ml-4 pl-8 border-l border-white/10">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#0a0a0a] border-2 border-orange-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase tracking-widest text-orange-500">Operation: Stock Update</span>
                          <span className="text-[9px] font-mono text-white/20">0{i+1} MAY 2024 // 14:00 UTC</span>
                        </div>
                        <p className="text-sm font-bold text-white/80 italic">Level Adjusted From {historyItem.stock + (i+1)*5} {'->'} {historyItem.stock + i*5}</p>
                        <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Authorized By: ADMIN_ROOT</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex justify-end">
                  <button 
                    onClick={() => setHistoryItem(null)}
                    className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all border border-white/10"
                  >
                    Close Session
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>


        {/* Summary Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-orange-500/20 p-3 rounded-xl">
                <AlertTriangle className="text-orange-500" size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black tracking-widest text-orange-500 uppercase">Critical Depletion</p>
                <p className="text-sm font-bold text-white/60">{items.filter(i => i.stock <= i.minStock).length} Items require immediate restock</p>
              </div>
            </div>
            <ChevronRight className="text-orange-500/40" />
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-xl">
                <Package className="text-white/40" size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black tracking-widest text-white/40 uppercase">Total Inventory Value</p>
                <p className="text-sm font-bold text-white/60">EST. $142,500.00 Credits</p>
              </div>
            </div>
            <ChevronRight className="text-white/20" />
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] rounded-3xl p-8 overflow-hidden"
            >
              {/* Modal Background Detail */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-orange-500/10 blur-[80px] -z-10 rounded-full" />
              
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black italic tracking-tighter uppercase">Initialize New Asset</h2>
                <div className="w-12 h-1 bg-orange-500 rounded-full" />
              </div>

              <form onSubmit={handleAddItem} className="space-y-6">
                <div>
                  <label className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase mb-2 block">Asset Name</label>
                  <input 
                    required
                    type="text" 
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    placeholder="Enter designation..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm font-mono focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-white/10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase mb-2 block">Stock Level</label>
                    <input 
                      required
                      type="number" 
                      value={newItem.stock}
                      onChange={(e) => setNewItem({...newItem, stock: parseInt(e.target.value)})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm font-mono focus:outline-none focus:border-orange-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase mb-2 block">Min. Threshold</label>
                    <input 
                      required
                      type="number" 
                      value={newItem.minStock}
                      onChange={(e) => setNewItem({...newItem, minStock: parseInt(e.target.value)})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm font-mono focus:outline-none focus:border-orange-500/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase mb-2 block">Measurement Unit</label>
                  <select 
                    value={newItem.unit}
                    onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                    style={{ fontFamily: 'Verdana' }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all text-white"
                  >
                    <option value="pcs" className="text-black">Pieces (pcs)</option>
                    <option value="kg" className="text-black">Kilograms (kg)</option>
                    <option value="L" className="text-black">Liters (L)</option>
                    <option value="box" className="text-black">Boxes (box)</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-4 bg-white/5 text-white/40 font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-white/10 transition-all"
                  >
                    Abort
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-4 bg-orange-500 text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-orange-400 transition-all shadow-[0_0_30px_rgba(249,115,22,0.2)]"
                  >
                    Confirm Initialize
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
