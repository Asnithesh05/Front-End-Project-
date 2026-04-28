import React from 'react';
import { StaffWidget } from './components/StaffWidget';
import { AddStaffModal } from './components/AddStaffModal';
import { ResponsiveContainer } from '../../components/global/ResponsiveContainer';
import { StaffMember } from '../../types/types';
import { AnimatePresence } from 'motion/react';

interface StaffingPageProps {
  staff: StaffMember[];
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onAddStaff: (s: Omit<StaffMember, 'id' | 'status'>) => void;
}

export const StaffingPage = ({ staff, isModalOpen, onOpenModal, onCloseModal, onAddStaff }: StaffingPageProps) => {
  return (
    <ResponsiveContainer className="py-24">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-on-surface uppercase italic leading-none">
            Team <span className="text-primary-container">Command</span>
          </h1>
          <p className="text-on-surface-variant uppercase tracking-widest font-bold text-xs">Manage your kitchen elite</p>
        </div>

        <StaffWidget staff={staff} onAddClick={onOpenModal} />
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <AddStaffModal 
            onClose={onCloseModal} 
            onAdd={onAddStaff} 
          />
        )}
      </AnimatePresence>
    </ResponsiveContainer>
  );
};
