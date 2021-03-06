import * as React from 'react';
import { injectIntl } from 'react-intl';
import { observer } from 'mobx-react';
import { Form } from 'react-bootstrap';
import { AppContext } from '../../../store/context';
import Field from '../../../components/Field';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import messages from './RegistrationForm.messages';
import setMessages from '../../../utils/setMessages';

const RegistrationForm = observer((props: any) => {
  const { loginStore } = React.useContext(AppContext);
  const message = setMessages(props, messages, 'app.form.registration.');
  const { onFieldChange, form } = loginStore;

  return (
    <Form>
      <Field
        className="login__field"
        label={message('email')}
        error={form.fields.email.error}
      >
        <Input
          type="text"
          placeholder={message('email.placeholder')}
          onChange={onFieldChange}
          value={form.fields.email.value}
          name="email"
        />
      </Field>
      <Field
        className="login__field"
        label={message('password')}
        error={form.fields.password.error}
      >
        <Input
          type="password"
          placeholder={message('password.placeholder')}
          onChange={onFieldChange}
          value={form.fields.password.value}
          name="password"
        />
      </Field>
      <Field
        className="login__field"
        label={message('password')}
        error={form.fields.password.error}
      >
        <Input
          type="password"
          placeholder={message('password.placeholder')}
          onChange={onFieldChange}
          value={form.fields.password.value}
          name="password"
        />
      </Field>
      <div className="text-center">
        <Button
          variant="primary"
          onClick={() => loginStore.signIn()}
          className="btn"
          disabled={!form.meta.isValid}
        >
          {message('register.button')}
        </Button>
      </div>
    </Form>
  );
});

export default injectIntl(RegistrationForm);
