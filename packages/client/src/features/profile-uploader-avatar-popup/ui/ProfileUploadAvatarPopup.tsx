import { FormEventHandler, useCallback, useEffect } from 'react';
import { User } from '@@entities/user';
import { STATUSES } from '@@shared/lib/constants/statuses-request';
import { useTriggerRequest } from '@@shared/lib/model/hooks';
import { Icon24Document } from '@vkontakte/icons';
import { Avatar, FormItem, ModalDismissButton, PopoutWrapper, File, CardGrid, GridAvatar } from '@vkontakte/vkui';
import { updateAvatarThunk } from '../model/actions';

type ProfileUploadAvatarProps = {
  user: Nullable<User>;
  onClose: () => void;
};

const StyleModal = {
  backgroundColor: 'var(--vkui--color_background_content)',
  borderRadius: 8,
  position: 'relative',
  padding: '12px',
  width: '400px',
} as Record<string, string | number>;

const FILE_INDEX = 0;

export const ProfileUploadAvatar = ({ user, onClose }: ProfileUploadAvatarProps) => {
  const [trigger, status] = useTriggerRequest<FormData>(updateAvatarThunk);

  const onChangeAvatar = useCallback(
    (evt: FormEventHandler<HTMLInputElement> | unknown) => {
      const files = ((evt as InputEvent).target as HTMLInputElement).files;

      if (files?.length) {
        const file = files[FILE_INDEX];
        const formData = new FormData();

        formData.append('avatar', file);

        trigger(formData);
      }
    },
    [trigger],
  );

  useEffect(() => {
    if (status === STATUSES.finished) {
      onClose();
    }
  }, [status, onClose]);

  return (
    <PopoutWrapper onClick={onClose}>
      <div style={StyleModal}>
        <CardGrid>
          <GridAvatar>{user && <Avatar src={user.avatar || undefined} />}</GridAvatar>

          <FormItem top="Загрузите аватар">
            <File
              loading={status === STATUSES.pending}
              before={<Icon24Document role="presentation" />}
              size="l"
              mode="secondary"
              onInput={onChangeAvatar}
            />
          </FormItem>

          <ModalDismissButton onClick={onClose} />
        </CardGrid>
      </div>
    </PopoutWrapper>
  );
};
