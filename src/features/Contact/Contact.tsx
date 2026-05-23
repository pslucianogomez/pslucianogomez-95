import styled from 'styled-components';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '../../ui/Button';
import { Input, Textarea, Label } from '../../ui/Field';
import { useLanguage } from '../../contexts/LanguageContext';
import { getBlockNumber } from '../../ui/Taskbar';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['3']}px;
`;

const Notice = styled.div<{ $tone: 'ok' | 'warn' }>`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.sm};
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.space['2']}px;
  border: ${({ theme }) => theme.border.thin};
  box-shadow: ${({ theme }) => theme.shadow.base};
  background: ${({ theme, $tone }) =>
    $tone === 'ok' ? theme.colors.ok : theme.colors.warn};
  color: ${({ theme }) => theme.colors.inkPaper};
`;

// EmailJS config — pulled from Vite env. Required:
// VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
const SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string | undefined;
const TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC   = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string | undefined;

export const Contact = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [errorText, setErrorText] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!SERVICE || !TEMPLATE || !PUBLIC) {
      setErrorText('EmailJS env vars missing'); setState('err'); return;
    }
    setState('sending');
    try {
      await emailjs.send(SERVICE, TEMPLATE, { from_name: name, reply_to: email, message }, { publicKey: PUBLIC });
      setName(''); setEmail(''); setMessage('');
      setState('ok');
    } catch (err) {
      setErrorText(err instanceof Error ? err.message : 'Unknown error');
      setState('err');
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <div>
        <Label htmlFor="name">{t('contact.name')}</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="email">{t('contact.email')}</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="message">{t('contact.message')}</Label>
        <Textarea id="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>
      <Button $variant="primary" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? t('contact.sending') : t('contact.send')}
      </Button>
      {state === 'ok' && (
        <Notice $tone="ok">{t('contact.success')} #{getBlockNumber().toLocaleString('en-US')}</Notice>
      )}
      {state === 'err' && (
        <Notice $tone="warn">{t('contact.error')} {errorText && `· ${errorText}`}</Notice>
      )}
    </Form>
  );
};
