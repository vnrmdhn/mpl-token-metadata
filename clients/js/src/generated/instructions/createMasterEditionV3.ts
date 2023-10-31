/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Option,
  OptionOrNullable,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  option,
  struct,
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findMasterEditionPda, findMetadataPda } from '../accounts';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type CreateMasterEditionV3InstructionAccounts = {
  /** Unallocated edition V2 account with address as pda of ['metadata', program id, mint, 'edition'] */
  edition?: PublicKey | Pda;
  /** Metadata mint */
  mint: PublicKey | Pda;
  /** Update authority */
  updateAuthority?: Signer;
  /** Mint authority on the metadata's mint - THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY */
  mintAuthority: Signer;
  /** payer */
  payer?: Signer;
  /** Metadata account */
  metadata?: PublicKey | Pda;
  /** Token program */
  tokenProgram?: PublicKey | Pda;
  /** System program */
  systemProgram?: PublicKey | Pda;
  /** Rent info */
  rent?: PublicKey | Pda;
};

// Data.
export type CreateMasterEditionV3InstructionData = {
  discriminator: number;
  maxSupply: Option<bigint>;
};

export type CreateMasterEditionV3InstructionDataArgs = {
  maxSupply: OptionOrNullable<number | bigint>;
};

export function getCreateMasterEditionV3InstructionDataSerializer(): Serializer<
  CreateMasterEditionV3InstructionDataArgs,
  CreateMasterEditionV3InstructionData
> {
  return mapSerializer<
    CreateMasterEditionV3InstructionDataArgs,
    any,
    CreateMasterEditionV3InstructionData
  >(
    struct<CreateMasterEditionV3InstructionData>(
      [
        ['discriminator', u8()],
        ['maxSupply', option(u64())],
      ],
      { description: 'CreateMasterEditionV3InstructionData' }
    ),
    (value) => ({ ...value, discriminator: 17 })
  ) as Serializer<
    CreateMasterEditionV3InstructionDataArgs,
    CreateMasterEditionV3InstructionData
  >;
}

// Args.
export type CreateMasterEditionV3InstructionArgs =
  CreateMasterEditionV3InstructionDataArgs;

// Instruction.
export function createMasterEditionV3(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: CreateMasterEditionV3InstructionAccounts &
    CreateMasterEditionV3InstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts = {
    edition: { index: 0, isWritable: true, value: input.edition ?? null },
    mint: { index: 1, isWritable: true, value: input.mint ?? null },
    updateAuthority: {
      index: 2,
      isWritable: false,
      value: input.updateAuthority ?? null,
    },
    mintAuthority: {
      index: 3,
      isWritable: false,
      value: input.mintAuthority ?? null,
    },
    payer: { index: 4, isWritable: true, value: input.payer ?? null },
    metadata: { index: 5, isWritable: true, value: input.metadata ?? null },
    tokenProgram: {
      index: 6,
      isWritable: false,
      value: input.tokenProgram ?? null,
    },
    systemProgram: {
      index: 7,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    rent: { index: 8, isWritable: false, value: input.rent ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: CreateMasterEditionV3InstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.edition.value) {
    resolvedAccounts.edition.value = findMasterEditionPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
    });
  }
  if (!resolvedAccounts.updateAuthority.value) {
    resolvedAccounts.updateAuthority.value = context.identity;
  }
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.metadata.value) {
    resolvedAccounts.metadata.value = findMetadataPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
    });
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
  const data = getCreateMasterEditionV3InstructionDataSerializer().serialize(
    resolvedArgs as CreateMasterEditionV3InstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
