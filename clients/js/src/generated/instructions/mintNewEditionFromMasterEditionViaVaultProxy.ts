/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';
import {
  MintNewEditionFromMasterEditionViaTokenArgs,
  MintNewEditionFromMasterEditionViaTokenArgsArgs,
  getMintNewEditionFromMasterEditionViaTokenArgsSerializer,
} from '../types';

// Accounts.
export type MintNewEditionFromMasterEditionViaVaultProxyInstructionAccounts = {
  /** New Metadata key (pda of ['metadata', program id, mint id]) */
  newMetadata: PublicKey | Pda;
  /** New Edition (pda of ['metadata', program id, mint id, 'edition']) */
  newEdition: PublicKey | Pda;
  /** Master Record Edition V2 (pda of ['metadata', program id, master metadata mint id, 'edition'] */
  masterEdition: PublicKey | Pda;
  /** Mint of new token - THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY */
  newMint: PublicKey | Pda;
  /** Edition pda to mark creation - will be checked for pre-existence. (pda of ['metadata', program id, master metadata mint id, 'edition', edition_number]) where edition_number is NOT the edition number you pass in args but actually edition_number = floor(edition/EDITION_MARKER_BIT_SIZE). */
  editionMarkPda: PublicKey | Pda;
  /** Mint authority of new mint */
  newMintAuthority: Signer;
  /** payer */
  payer?: Signer;
  /** Vault authority */
  vaultAuthority: Signer;
  /** Safety deposit token store account */
  safetyDepositStore: PublicKey | Pda;
  /** Safety deposit box */
  safetyDepositBox: PublicKey | Pda;
  /** Vault */
  vault: PublicKey | Pda;
  /** Update authority info for new metadata */
  newMetadataUpdateAuthority: PublicKey | Pda;
  /** Master record metadata account */
  metadata: PublicKey | Pda;
  /** Token program */
  tokenProgram?: PublicKey | Pda;
  /** Token vault program */
  tokenVaultProgram: PublicKey | Pda;
  /** System program */
  systemProgram?: PublicKey | Pda;
  /** Rent info */
  rent?: PublicKey | Pda;
};

// Data.
export type MintNewEditionFromMasterEditionViaVaultProxyInstructionData = {
  discriminator: number;
  mintNewEditionFromMasterEditionViaTokenArgs: MintNewEditionFromMasterEditionViaTokenArgs;
};

export type MintNewEditionFromMasterEditionViaVaultProxyInstructionDataArgs = {
  mintNewEditionFromMasterEditionViaTokenArgs: MintNewEditionFromMasterEditionViaTokenArgsArgs;
};

export function getMintNewEditionFromMasterEditionViaVaultProxyInstructionDataSerializer(): Serializer<
  MintNewEditionFromMasterEditionViaVaultProxyInstructionDataArgs,
  MintNewEditionFromMasterEditionViaVaultProxyInstructionData
> {
  return mapSerializer<
    MintNewEditionFromMasterEditionViaVaultProxyInstructionDataArgs,
    any,
    MintNewEditionFromMasterEditionViaVaultProxyInstructionData
  >(
    struct<MintNewEditionFromMasterEditionViaVaultProxyInstructionData>(
      [
        ['discriminator', u8()],
        [
          'mintNewEditionFromMasterEditionViaTokenArgs',
          getMintNewEditionFromMasterEditionViaTokenArgsSerializer(),
        ],
      ],
      {
        description:
          'MintNewEditionFromMasterEditionViaVaultProxyInstructionData',
      }
    ),
    (value) => ({ ...value, discriminator: 13 })
  ) as Serializer<
    MintNewEditionFromMasterEditionViaVaultProxyInstructionDataArgs,
    MintNewEditionFromMasterEditionViaVaultProxyInstructionData
  >;
}

// Args.
export type MintNewEditionFromMasterEditionViaVaultProxyInstructionArgs =
  MintNewEditionFromMasterEditionViaVaultProxyInstructionDataArgs;

// Instruction.
export function mintNewEditionFromMasterEditionViaVaultProxy(
  context: Pick<Context, 'payer' | 'programs'>,
  input: MintNewEditionFromMasterEditionViaVaultProxyInstructionAccounts &
    MintNewEditionFromMasterEditionViaVaultProxyInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts = {
    newMetadata: {
      index: 0,
      isWritable: true,
      value: input.newMetadata ?? null,
    },
    newEdition: { index: 1, isWritable: true, value: input.newEdition ?? null },
    masterEdition: {
      index: 2,
      isWritable: true,
      value: input.masterEdition ?? null,
    },
    newMint: { index: 3, isWritable: true, value: input.newMint ?? null },
    editionMarkPda: {
      index: 4,
      isWritable: true,
      value: input.editionMarkPda ?? null,
    },
    newMintAuthority: {
      index: 5,
      isWritable: false,
      value: input.newMintAuthority ?? null,
    },
    payer: { index: 6, isWritable: true, value: input.payer ?? null },
    vaultAuthority: {
      index: 7,
      isWritable: false,
      value: input.vaultAuthority ?? null,
    },
    safetyDepositStore: {
      index: 8,
      isWritable: false,
      value: input.safetyDepositStore ?? null,
    },
    safetyDepositBox: {
      index: 9,
      isWritable: false,
      value: input.safetyDepositBox ?? null,
    },
    vault: { index: 10, isWritable: false, value: input.vault ?? null },
    newMetadataUpdateAuthority: {
      index: 11,
      isWritable: false,
      value: input.newMetadataUpdateAuthority ?? null,
    },
    metadata: { index: 12, isWritable: false, value: input.metadata ?? null },
    tokenProgram: {
      index: 13,
      isWritable: false,
      value: input.tokenProgram ?? null,
    },
    tokenVaultProgram: {
      index: 14,
      isWritable: false,
      value: input.tokenVaultProgram ?? null,
    },
    systemProgram: {
      index: 15,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    rent: { index: 16, isWritable: false, value: input.rent ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: MintNewEditionFromMasterEditionViaVaultProxyInstructionArgs =
    { ...input };

  // Default values.
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.tokenProgram.value) {
    resolvedAccounts.tokenProgram.value = context.programs.getPublicKey(
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    );
    resolvedAccounts.tokenProgram.isWritable = false;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'omitted',
    programId
  );

  // Data.
  const data =
    getMintNewEditionFromMasterEditionViaVaultProxyInstructionDataSerializer().serialize(
      resolvedArgs as MintNewEditionFromMasterEditionViaVaultProxyInstructionDataArgs
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
