import { OpenAIModel, OpenAIModelID } from '@/types/openai';
import { useTranslation } from 'next-i18next';
import { IconExternalLink } from '@tabler/icons-react';
import { FC } from 'react';

interface Props {
  model: OpenAIModel;
  models: OpenAIModel[];
  defaultModelId: OpenAIModelID;
  onModelChange: (model: OpenAIModel) => void;
}

export const ModelSelect: FC<Props> = ({
  model,
  models,
  defaultModelId,
  onModelChange,
}) => {
  const { t } = useTranslation('chat');

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-left text-gray-700 dark:text-gray-400">
        {t('Model')}
      </label>
      <div className="w-full rounded-lg border border-gray-200 bg-transparent pr-2 text-gray-900 dark:border-gray-600 dark:text-white">
        <select
          className="w-full bg-transparent p-2"
          placeholder={t('Select a model') || ''}
          value={model?.id || defaultModelId}
          onChange={(e) => {
            onModelChange(
              models.find(
                (model) => model.id === e.target.value,
              ) as OpenAIModel,
            );
          }}
        >
          {models.map((model) => (
            <option
              key={model.id}
              value={model.id}
              className="dark:bg-green-900 dark:text-white"
            >
              {model.id === defaultModelId
                ? `Default (${model.name})`
                : model.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full mt-3 text-left text-gray-700 dark:text-gray-400 flex items-center">
        <a href="https://platform.openai.com/account/usage" target="_blank" className="flex items-center">
          <IconExternalLink size={18} className={"inline mr-1"} />
          {t('View Account Usage')}
        </a>
      </div>
    </div>
  );
};
