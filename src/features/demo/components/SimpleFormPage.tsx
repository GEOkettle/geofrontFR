import { z } from 'zod'

import { DemoSurface } from '#/features/demo/components/DemoSurface'
import { useDemoForm } from '#/features/demo/hooks/useDemoForm'

const simpleFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
})

export function SimpleFormPage() {
  const form = useDemoForm({
    defaultValues: {
      title: '',
      description: '',
    },
    validators: {
      onBlur: simpleFormSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value)
      window.alert('Form submitted successfully!')
    },
  })

  return (
    <DemoSurface
      title="Simple Form"
      gradient="radial-gradient(50% 50% at 5% 40%, #add8e6 0%, #0000ff 70%, #00008b 100%)"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault()
          event.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-6"
      >
        <form.AppField name="title">
          {(field) => <field.TextField label="Title" />}
        </form.AppField>

        <form.AppField name="description">
          {(field) => <field.TextArea label="Description" />}
        </form.AppField>

        <div className="flex justify-end">
          <form.AppForm>
            <form.SubscribeButton label="Submit" />
          </form.AppForm>
        </div>
      </form>
    </DemoSurface>
  )
}
