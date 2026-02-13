import React from 'react';
import { createContext, useContext, useState } from 'react';

const ProfileContext = createContext({});

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    Account_Managed_for: '',
    profileGender: '',
    Name: '',
    Gender: '',
    Age: '',
    DateOfBirth: '',
    Height: '',
    Description: '',
    Role: '',
    Company: '',
    IncomeRange: '',
    IncomeType: '',
    City: '',
    State: '',
    Category: 'Jain',
    Subcategory: '',
    Degree: '',
    College: '',
    FatherName: '',
    FatherOccupation: '',
    MotherName: '',
    FamilyMembers: '',
    Familytype: '',
    ParentCity: '',
    ParentState: '',
    Interest1: '',
    Interest2: '',
    Interest3: '',
    Interest4: '',
    Interest5: '',
    Interest6: '',
    imageUrl1: '',
    image01: '',
    image02: '',
    image03: '',
    status: 'New',
    active: 'enabled'
  });

  const updateProfileData = (data) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  const resetProfileData = () => {
    setProfileData({
      Account_Managed_for: '',
      profileGender: '',
      Name: '',
      Gender: '',
      Age: '',
      DateOfBirth: '',
      Height: '',
      Description: '',
      Role: '',
      Company: '',
      IncomeRange: '',
      IncomeType: '',
      City: '',
      State: '',
      Category: 'Jain',
      Subcategory: '',
      Degree: '',
      College: '',
      FatherName: '',
      FatherOccupation: '',
      MotherName: '',
      FamilyMembers: '',
      Familytype: '',
      ParentCity: '',
      ParentState: '',
      Interest1: '',
      Interest2: '',
      Interest3: '',
      Interest4: '',
      Interest5: '',
      Interest6: '',
      imageUrl1: '',
      image01: '',
      image02: '',
      image03: '',
      status: 'New',
      active: 'enabled'
    });
  };

  const value = {
    profileData,
    updateProfileData,
    resetProfileData
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};
