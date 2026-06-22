import { useState, useEffect } from 'react';
import { StaffMember } from '../types/types';
import { INITIAL_STAFF } from '../data/mockData';

export const useStaffDatabase = () => {
  const [activeStaff, setActiveStaff] = useState<StaffMember[]>([]);
  const [terminatedStaff, setTerminatedStaff] = useState<StaffMember[]>([]);

  useEffect(() => {
    const savedActive = localStorage.getItem('activeStaff');
    const savedTerminated = localStorage.getItem('terminatedStaff');

    if (savedActive) {
      setActiveStaff(JSON.parse(savedActive));
    } else {
      // Initialize with mock data if empty
      const initialActive = INITIAL_STAFF.map(s => ({
        ...s,
        email: s.email || `${s.name.split(' ')[0].toLowerCase()}@kinetichearth.com`,
        phone: s.phone || `+1 (555) ${Math.floor(100+Math.random()*900)}-${Math.floor(1000+Math.random()*9000)}`,
        address: s.address || 'KinetiCity District 4, Node 12'
      }));
      setActiveStaff(initialActive);
      localStorage.setItem('activeStaff', JSON.stringify(initialActive));
    }

    if (savedTerminated) {
      setTerminatedStaff(JSON.parse(savedTerminated));
    }
  }, []);

  const addStaff = (member: Omit<StaffMember, 'id' | 'status'>) => {
    const newMember: StaffMember = {
      ...member,
      id: Math.random().toString(36).substr(2, 9),
      status: 'off-shift'
    };
    const updated = [...activeStaff, newMember];
    setActiveStaff(updated);
    localStorage.setItem('activeStaff', JSON.stringify(updated));
  };

  const terminateStaff = (id: string) => {
    const memberToTerminate = activeStaff.find(s => s.id === id);
    if (!memberToTerminate) return;

    const updatedActive = activeStaff.filter(s => s.id !== id);
    const updatedTerminated = [
      ...terminatedStaff,
      { 
        ...memberToTerminate, 
        status: 'off-shift' as const, 
        terminationDate: new Date().toLocaleDateString() 
      }
    ];

    setActiveStaff(updatedActive);
    setTerminatedStaff(updatedTerminated);
    
    localStorage.setItem('activeStaff', JSON.stringify(updatedActive));
    localStorage.setItem('terminatedStaff', JSON.stringify(updatedTerminated));
  };

  const getStaff = () => ({ activeStaff, terminatedStaff });

  return { activeStaff, terminatedStaff, addStaff, terminateStaff, getStaff };
};
