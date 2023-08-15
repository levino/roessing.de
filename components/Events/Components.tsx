import React from 'react'
import * as O from 'fp-ts/Option'
import { Option } from 'fp-ts/Option'
import { Address } from '../../src/event'

const addressToString = (address: Address) =>
  `${address.streetAddress}, ${address.postalCode} ${address.addressLocality}`
export const AddressLink: React.FC<{
  className: string
  address: Option<Address>
}> = ({ className, address }) =>
  O.match(
    () => null,
    (address: Address) => (
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          addressToString(address)
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {addressToString(address)}
      </a>
    )
  )(address)
export const Description: React.FC<{
  className: string
  description: Option<string>
}> = ({ className, description }) =>
  O.match(
    () => null,
    (value: string) => <div className={className}>{value}</div>
  )(description)
