import { cn } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'

type LucideIconName = keyof typeof LucideIcons

interface MetricItem {
  icon: LucideIconName
  percentages: {
    old?: string
    new: string
  }
  description: React.ReactNode
}

interface MetricListProps {
  items: MetricItem[]
  iconClassName?: string
}

export const MetricsList = ({ items, iconClassName }: MetricListProps) => {
  return (
    <div className="space-y-2.5 pb-1">
      {items.map((item, index) => {
        const Icon = LucideIcons[item.icon] as React.ComponentType<{
          className?: string
        }>
        return (
          <div key={index} className="flex items-center gap-1">
            <Icon
              className={cn(
                'mx-1 size-4.5 flex-shrink-0 max-md:place-self-start max-md:mt-1',
                iconClassName
              )}
              aria-hidden="true"
            />
            <div className="tabular-nums space-x-1">
              {item.percentages.old && (
                <span className="line-through">{item.percentages.old}</span>
              )}

              <span className="font-bold">{item.percentages.new}</span>

              <span>{item.description}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
