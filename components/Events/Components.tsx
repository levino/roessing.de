import React, { ReactNode } from 'react'
import * as O from 'fp-ts/Option'
import { Option } from 'fp-ts/Option'
import { Address } from '../../data/events/event'
import cn from 'classnames'
import { onRight } from './tools'
const addressToString = (address: Address) =>
  `${address.streetAddress}, ${address.postalCode} ${address.addressLocality}`
export const AddressLink: React.FC<{
  className: string
  address: Option<Address>
}> = ({ className, address }) =>
  O.match(
    () => null,
    (address: Address) => (
      <ExternalLink
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          addressToString(address)
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {addressToString(address)}
      </ExternalLink>
    )
  )(address)
export const Description: React.FC<{
  className: string
  description: Option<ReactNode>
}> = ({ className, description }) =>
  onRight((value: ReactNode) => <div className={className}>{value}</div>)(
    description
  )
export const ExternalLink: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
> = (props) => (
  <a
    rel="noreferrer noopener"
    target="_blank"
    className={cn(props.className, 'text-blue-500 hover:underline')}
    {...props}
  />
)
