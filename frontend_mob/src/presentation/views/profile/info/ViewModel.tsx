import { useState, useEffect } from 'react';
import { RemoveUserLocalUseCase } from '../../../../domain/useCases/userLocal/RemoveUserLocal';
import { GetUserLocalUseCase } from '../../../../domain/useCases/userLocal/GetUserLocal';

const ProfileInfoViewModel = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const savedUser = await GetUserLocalUseCase();
    setUser(savedUser);
  };

  const removeSession = async () => {
    await RemoveUserLocalUseCase();
  };

  return { user, removeSession };
};

export default ProfileInfoViewModel;