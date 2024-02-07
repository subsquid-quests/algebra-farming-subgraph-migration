import {
  Transfer
} from '../types/FarmingCenter/FarmingCenter'
import { Address , BigInt } from '@graphprotocol/graph-ts';
import {  Deposit } from '../types/schema'
import { FarmingCenter } from '../types/FarmingCenter/FarmingCenter'


export function handleTransfer(event: Transfer): void {

  let L2 = getL2(event.params.tokenId, Address.fromString(event.address.toHexString()))

  let deposit = Deposit.load(L2.toString());

  if (deposit != null) {
    deposit.owner = event.params.to;
    deposit.L2tokenId = event.params.tokenId
    deposit.save();
  }
  
}

function getL2(tokenId: BigInt, FarmingCenterAddress: Address): BigInt {

  let contract = FarmingCenter.bind(FarmingCenterAddress )
  let depositCall = contract.try_l2Nfts(tokenId)
  let result = BigInt.fromString("0")
  if (!depositCall.reverted) {
      let depositResult = depositCall.value
      result = depositResult.value2
  }
  return result
}
  