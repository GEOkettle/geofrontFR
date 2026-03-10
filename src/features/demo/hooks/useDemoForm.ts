import { createFormHook } from '@tanstack/react-form'

import {
  Select,
  SubscribeButton,
  TextArea,
  TextField,
} from '#/features/demo/components/FormComponents'
import { fieldContext, formContext } from '#/features/demo/hooks/demoFormContext'

export const { useAppForm: useDemoForm } = createFormHook({
  fieldComponents: {
    TextField,
    Select,
    TextArea,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
})
