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
  publicKey,
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

// Accounts.
export type VerifyCreatorV1InstructionAccounts = {
  /** Creator to verify, collection update authority or delegate */
  authority?: Signer;
  /** Delegate record PDA */
  delegateRecord?: PublicKey | Pda;
  /** Metadata account */
  metadata: PublicKey | Pda;
  /** Mint of the Collection */
  collectionMint?: PublicKey | Pda;
  /** Metadata Account of the Collection */
  collectionMetadata?: PublicKey | Pda;
  /** Master Edition Account of the Collection Token */
  collectionMasterEdition?: PublicKey | Pda;
  /** System program */
  systemProgram?: PublicKey | Pda;
  /** Instructions sysvar account */
  sysvarInstructions?: PublicKey | Pda;
};

// Data.
export type VerifyCreatorV1InstructionData = {
  discriminator: number;
  verifyCreatorV1Discriminator: number;
};

export type VerifyCreatorV1InstructionDataArgs = {};

export function getVerifyCreatorV1InstructionDataSerializer(): Serializer<
  VerifyCreatorV1InstructionDataArgs,
  VerifyCreatorV1InstructionData
> {
  return mapSerializer<
    VerifyCreatorV1InstructionDataArgs,
    any,
    VerifyCreatorV1InstructionData
  >(
    struct<VerifyCreatorV1InstructionData>(
      [
        ['discriminator', u8()],
        ['verifyCreatorV1Discriminator', u8()],
      ],
      { description: 'VerifyCreatorV1InstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: 52,
      verifyCreatorV1Discriminator: 0,
    })
  ) as Serializer<
    VerifyCreatorV1InstructionDataArgs,
    VerifyCreatorV1InstructionData
  >;
}

// Instruction.
export function verifyCreatorV1(
  context: Pick<Context, 'identity' | 'programs'>,
  input: VerifyCreatorV1InstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts = {
    authority: { index: 0, isWritable: false, value: input.authority ?? null },
    delegateRecord: {
      index: 1,
      isWritable: false,
      value: input.delegateRecord ?? null,
    },
    metadata: { index: 2, isWritable: true, value: input.metadata ?? null },
    collectionMint: {
      index: 3,
      isWritable: false,
      value: input.collectionMint ?? null,
    },
    collectionMetadata: {
      index: 4,
      isWritable: true,
      value: input.collectionMetadata ?? null,
    },
    collectionMasterEdition: {
      index: 5,
      isWritable: false,
      value: input.collectionMasterEdition ?? null,
    },
    systemProgram: {
      index: 6,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    sysvarInstructions: {
      index: 7,
      isWritable: false,
      value: input.sysvarInstructions ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Default values.
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }
  if (!resolvedAccounts.sysvarInstructions.value) {
    resolvedAccounts.sysvarInstructions.value = publicKey(
      'Sysvar1nstructions1111111111111111111111111'
    );
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getVerifyCreatorV1InstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
