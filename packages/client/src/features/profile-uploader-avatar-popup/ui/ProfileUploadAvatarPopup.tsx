import { FormEventHandler, useCallback, useEffect } from 'react';
import { User } from '@@entities/user';
import { cn } from '@@shared/lib/bem';
import { STATUSES } from '@@shared/lib/constants/statuses-request';
import { useTriggerRequest } from '@@shared/lib/model/hooks';
import { Icon24Document } from '@vkontakte/icons';
import { Avatar, FormItem, ModalDismissButton, PopoutWrapper, File, CardGrid, GridAvatar, Div } from '@vkontakte/vkui';
import { updateAvatarThunk } from '../model/actions';

import './styles.scss';

type ProfileUploadAvatarProps = {
  user: Nullable<User>;
  onClose: () => void;
};

const FILE_INDEX = 0;

const cnUploadPopup = cn('UploadPopup');

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
      <Div style={{ background: 'var(--vkui--color_background_content)' }} className={cnUploadPopup()}>
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
      </Div>
    </PopoutWrapper>
  );
};
