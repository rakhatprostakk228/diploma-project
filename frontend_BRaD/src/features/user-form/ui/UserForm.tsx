import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button } from '@shared/ui';
import { createUserSchema, UserFormData, useUserStore } from '@entities/user';
import styles from './UserForm.module.css';

interface UserFormProps {
  onSuccess?: () => void;
  initialData?: Partial<UserFormData>;
}

export const UserForm = ({ onSuccess, initialData }: UserFormProps) => {
  const { createUser, updateUser, selectedUser, isLoading } = useUserStore();
  const isEdit = !!selectedUser;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: initialData || {
      name: '',
      email: '',
      role: 'user',
      status: 'active',
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      if (isEdit && selectedUser) {
        await updateUser(selectedUser.id, data);
      } else {
        await createUser(data);
      }
      onSuccess?.();
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        label="Name"
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <div className={styles.row}>
        <div className={styles.selectGroup}>
          <label className={styles.label}>Role</label>
          <select {...register('role')} className={styles.select}>
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className={styles.selectGroup}>
          <label className={styles.label}>Status</label>
          <select {...register('status')} className={styles.select}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>
      <div className={styles.actions}>
        <Button type="submit" disabled={isLoading}>
          {isEdit ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </form>
  );
};

