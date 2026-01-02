import React, { createContext, useContext, useState } from 'react';
import { Cloud, Building2, Cpu, Leaf, GraduationCap, Briefcase, CreditCard, ShieldCheck, Dumbbell, Users } from 'lucide-react';

// Import logo images
import fintechLogo from '../assets/fintech.png';
import healthcareLogo from '../assets/healthcare.png';
import aiLogo from '../assets/AI.png';
import agritechLogo from '../assets/agritech.png';
import pharmaLogo from '../assets/pharma.png';
import manufacturingLogo from '../assets/manufacturing.png';
import edtechLogo from '../assets/ed-tech.png';

const SectorContext = createContext();

export const useSectors = () => useContext(SectorContext);

export const AVAILABLE_ICONS = [
    { name: 'Cloud', icon: Cloud },
    { name: 'Building', icon: Building2 },
    { name: 'CPU', icon: Cpu },
    { name: 'Leaf', icon: Leaf },
    { name: 'Education', icon: GraduationCap },
    { name: 'Business', icon: Briefcase },
    { name: 'Finance', icon: CreditCard },
    { name: 'Shield', icon: ShieldCheck },
    { name: 'Fitness', icon: Dumbbell },
    { name: 'HR', icon: Users },
];

export const AVAILABLE_LOGOS = [
    { name: 'Fintech', logo: fintechLogo },
    { name: 'Healthcare', logo: healthcareLogo },
    { name: 'AI', logo: aiLogo },
    { name: 'Agritech', logo: agritechLogo },
    { name: 'Pharma', logo: pharmaLogo },
    { name: 'Manufacturing', logo: manufacturingLogo },
    { name: 'Edtech', logo: edtechLogo },
];

export const SectorProvider = ({ children }) => {
    const [sectors, setSectors] = useState([
        {
            title: 'BFSI',
            logo: fintechLogo,
            count: '12',
            desc: 'Banking, Financial Services, and Insurance',
        },
        {
            title: 'HealthCare/Pharma',
            logo: healthcareLogo,
            count: '8',
            desc: 'Medical records & patient management',
        },
        {
            title: 'IT',
            logo: aiLogo,
            count: '5',
            desc: 'Software and Information Technology',
        },
        {
            title: 'Enterprise',
            iconName: 'Cloud',
            count: '10',
            desc: 'Enterprise Services',
        },
        {
            title: 'Green',
            logo: agritechLogo,
            count: '6',
            desc: 'Agricultural innovation & tracking',
        },
        {
            title: 'Fundraising & Investor Relations',
            logo: pharmaLogo,
            count: '4',
            desc: 'Management of fundraising and Invester relationships',
        },
        {
            title: 'Consumer / Manufacturing',
            logo: manufacturingLogo,
            count: '9',
            desc: 'Industrial production & supply chain',
        },
        {
            title: 'Credit',
            logo: edtechLogo,
            count: '7',
            desc: 'Credit section',
        },
        {
            title: 'Fitness',
            iconName: 'Fitness',
            count: '0',
            desc: 'Health and wellness tracking',
        },
        {
            title: 'HR',
            iconName: 'HR',
            count: '0',
            desc: 'Human Resources and talent management',
        },
    ]);

    const addSector = (newSector) => {
        setSectors(prev => [...prev, {
            ...newSector,
            count: '0', // New sectors start with 0
        }]);
    };

    return (
        <SectorContext.Provider value={{ sectors, addSector, AVAILABLE_ICONS, AVAILABLE_LOGOS }}>
            {children}
        </SectorContext.Provider>
    );
};
