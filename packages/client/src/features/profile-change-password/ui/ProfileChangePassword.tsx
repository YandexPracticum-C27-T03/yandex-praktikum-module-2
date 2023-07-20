import { useEffect } from 'react';
import { ChangePasswordDTO } from '@@entities/profile';
import { STATUSES } from '@@shared/lib/constants/statuses-request';
import { useTriggerRequest } from '@@shared/lib/model/hooks';
import { Form } from '@@shared/ui/Form';
import { Button, PopoutWrapper } from '@vkontakte/vkui';
import { loginFormFields } from '../lib/formSettings';
import { changePassowordThunk } from '../model/actions';

type ProfileChangePasswordProps = {
  onClose: () => void;
};

export const ProfileChangePassword = ({ onClose }: ProfileChangePasswordProps) => {
  const [trigger, status] = useTriggerRequest<ChangePasswordDTO>(changePassowordThunk);

  function onSubmit(dto: ChangePasswordDTO) {
    trigger(dto);
  }

  useEffect(() => {
    if (status === STATUSES.finished) {
      onClose();
    }
  }, [status, onClose]);

  return (
    <PopoutWrapper onClick={onClose}>
      <Form<ChangePasswordDTO> fields={loginFormFields} cb={onSubmit}>
        <Button onClick={onClose}>Отмена</Button>

        <Button type="submit" loading={STATUSES.pending === status}>
          Изменить пароль
        </Button>
      </Form>
    </PopoutWrapper>
  );
};
