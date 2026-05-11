/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import {
  defaultGeneratorInput,
  generatorOptions,
  recommendStack,
  type GeneratorCatalog,
  type GeneratorInput,
} from '../lib/stack-generator';

type Props = {
  catalog: GeneratorCatalog;
  title?: string;
  intro?: string;
  embedded?: boolean;
  initialInput?: Partial<GeneratorInput>;
};

type FieldName = keyof GeneratorInput;

export default function StackGeneratorIsland({
  catalog,
  title = 'Stack Generator',
  intro = 'Choose the job, the collaboration pressure, and how much ownership you need. Offpedia returns one stack, the matching kit or guide, and the nearest alternative.',
  embedded = false,
  initialInput = {},
}: Props) {
  const [input, setInput] = useState<GeneratorInput>({
    ...defaultGeneratorInput,
    ...initialInput,
  });
  const recommendation = recommendStack(catalog, input);

  const updateField = <K extends FieldName,>(field: K, value: GeneratorInput[K]) => {
    setInput((current) => ({ ...current, [field]: value }));
  };

  return (
    <section
      className={[
        'workflow-finder rounded-[2rem] border border-line bg-bg-surface/70 backdrop-blur p-6 sm:p-8',
        embedded ? '' : 'container-wide my-10 sm:my-14',
      ].join(' ')}
    >
      <div className="grid grid-cols-1 xl:grid-cols-[0.96fr_1.04fr] gap-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-text-subtle mb-3">Interactive stack generator</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
          <p className="mt-3 text-text-muted max-w-xl">{intro}</p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="finder-field">
              <span>Persona</span>
              <select
                name="persona"
                value={input.persona}
                onInput={(event) => updateField('persona', (event.currentTarget as HTMLSelectElement).value as GeneratorInput['persona'])}
              >
                {generatorOptions.persona.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>

            <label className="finder-field">
              <span>Goal</span>
              <select
                name="goal"
                value={input.goal}
                onInput={(event) => updateField('goal', (event.currentTarget as HTMLSelectElement).value as GeneratorInput['goal'])}
              >
                {generatorOptions.goal.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>

            <label className="finder-field">
              <span>Offline need</span>
              <select
                name="offlineNeed"
                value={input.offlineNeed}
                onInput={(event) =>
                  updateField('offlineNeed', (event.currentTarget as HTMLSelectElement).value as GeneratorInput['offlineNeed'])
                }
              >
                {generatorOptions.offlineNeed.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>

            <label className="finder-field">
              <span>Git need</span>
              <select
                name="gitNeed"
                value={input.gitNeed}
                onInput={(event) => updateField('gitNeed', (event.currentTarget as HTMLSelectElement).value as GeneratorInput['gitNeed'])}
              >
                {generatorOptions.gitNeed.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>

            <label className="finder-field">
              <span>Publishing need</span>
              <select
                name="publishingNeed"
                value={input.publishingNeed}
                onInput={(event) =>
                  updateField('publishingNeed', (event.currentTarget as HTMLSelectElement).value as GeneratorInput['publishingNeed'])
                }
              >
                {generatorOptions.publishingNeed.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>

            <label className="finder-field">
              <span>Team or collaboration need</span>
              <select
                name="collaborationNeed"
                value={input.collaborationNeed}
                onInput={(event) =>
                  updateField(
                    'collaborationNeed',
                    (event.currentTarget as HTMLSelectElement).value as GeneratorInput['collaborationNeed'],
                  )
                }
              >
                {generatorOptions.collaborationNeed.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="badge-accent">Server-rendered default result</span>
            <span className="badge">Hydrates only the selector surface</span>
            <span className="badge">No blank no-JS state</span>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/5 bg-[#0a0d11] p-6 sm:p-7" aria-live="polite">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="badge-accent">Recommended stack</span>
            <span className="badge">{recommendation.matchedSignals[0] || 'Constraint-matched'}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{recommendation.stack.label}</h3>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">{recommendation.summary}</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <article className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-2">Why this fits</p>
              <p className="text-sm text-slate-200">{recommendation.reason}</p>
            </article>
            <article className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-2">Avoid if</p>
              <p className="text-sm text-slate-200">{recommendation.warning}</p>
            </article>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <a className="finder-link-primary" href={recommendation.stack.href}>
              <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Recommended stack</span>
              <span className="block text-base font-semibold text-white mt-1">{recommendation.stack.label}</span>
            </a>

            {recommendation.kit && (
              <a className="finder-link" href={recommendation.kit.href}>
                <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Kit</span>
                <span className="block text-sm font-medium text-slate-100 mt-1">{recommendation.kit.label}</span>
              </a>
            )}

            {recommendation.guide && (
              <a className="finder-link" href={recommendation.guide.href}>
                <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Guide</span>
                <span className="block text-sm font-medium text-slate-100 mt-1">{recommendation.guide.label}</span>
              </a>
            )}

            <a className="finder-link" href={recommendation.nextStep.href}>
              <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Next step</span>
              <span className="block text-sm font-medium text-slate-100 mt-1">{recommendation.nextStep.label}</span>
            </a>

            <a className="finder-link" href={recommendation.alternative.href}>
              <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Alternative</span>
              <span className="block text-sm font-medium text-slate-100 mt-1">{recommendation.alternative.label}</span>
              {recommendation.alternative.note && (
                <span className="block text-sm text-slate-400 mt-1">{recommendation.alternative.note}</span>
              )}
            </a>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-2">Trust criteria</p>
            <div className="flex flex-wrap gap-2">
              {recommendation.trustCriteria.map((criterion) => (
                <span className="badge bg-white/5 text-slate-200 border-white/10">{criterion}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
