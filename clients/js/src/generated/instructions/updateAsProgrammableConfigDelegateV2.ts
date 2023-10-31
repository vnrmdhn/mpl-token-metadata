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
  none,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  option,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findMetadataDelegateRecordPda, findMetadataPda } from '../accounts';
import {
  PickPartial,
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  expectSome,
  getAccountMetasAndSigners,
} from '../shared';
import {
  AuthorizationData,
  AuthorizationDataArgs,
  MetadataDelegateRole,
  RuleSetToggle,
  RuleSetToggleArgs,
  getAuthorizationDataSerializer,
  getRuleSetToggleSerializer,
  ruleSetToggle,
} from '../types';

// Accounts.
export type UpdateAsProgrammableConfigDelegateV2InstructionAccounts = {
  /** Update authority or delegate */
  authority?: Signer;
  /** Delegate record PDA */
  delegateRecord?: PublicKey | Pda;
  /** Token account */
  token: PublicKey | Pda;
  /** Mint account */
  mint: PublicKey | Pda;
  /** Metadata account */
  metadata?: PublicKey | Pda;
  /** Edition account */
  edition?: PublicKey | Pda;
  /** Payer */
  payer?: Signer;
  /** System program */
  systemProgram?: PublicKey | Pda;
  /** Instructions sysvar account */
  sysvarInstructions?: PublicKey | Pda;
  /** Token Authorization Rules Program */
  authorizationRulesProgram?: PublicKey | Pda;
  /** Token Authorization Rules account */
  authorizationRules?: PublicKey | Pda;
};

// Data.
export type UpdateAsProgrammableConfigDelegateV2InstructionData = {
  discriminator: number;
  updateAsProgrammableConfigDelegateV2Discriminator: number;
  ruleSet: RuleSetToggle;
  authorizationData: Option<AuthorizationData>;
};

export type UpdateAsProgrammableConfigDelegateV2InstructionDataArgs = {
  ruleSet?: RuleSetToggleArgs;
  authorizationData?: OptionOrNullable<AuthorizationDataArgs>;
};

export function getUpdateAsProgrammableConfigDelegateV2InstructionDataSerializer(): Serializer<
  UpdateAsProgrammableConfigDelegateV2InstructionDataArgs,
  UpdateAsProgrammableConfigDelegateV2InstructionData
> {
  return mapSerializer<
    UpdateAsProgrammableConfigDelegateV2InstructionDataArgs,
    any,
    UpdateAsProgrammableConfigDelegateV2InstructionData
  >(
    struct<UpdateAsProgrammableConfigDelegateV2InstructionData>(
      [
        ['discriminator', u8()],
        ['updateAsProgrammableConfigDelegateV2Discriminator', u8()],
        ['ruleSet', getRuleSetToggleSerializer()],
        ['authorizationData', option(getAuthorizationDataSerializer())],
      ],
      { description: 'UpdateAsProgrammableConfigDelegateV2InstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: 50,
      updateAsProgrammableConfigDelegateV2Discriminator: 5,
      ruleSet: value.ruleSet ?? ruleSetToggle('None'),
      authorizationData: value.authorizationData ?? none(),
    })
  ) as Serializer<
    UpdateAsProgrammableConfigDelegateV2InstructionDataArgs,
    UpdateAsProgrammableConfigDelegateV2InstructionData
  >;
}

// Extra Args.
export type UpdateAsProgrammableConfigDelegateV2InstructionExtraArgs = {
  delegateMint: PublicKey;
  delegateUpdateAuthority: PublicKey;
};

// Args.
export type UpdateAsProgrammableConfigDelegateV2InstructionArgs = PickPartial<
  UpdateAsProgrammableConfigDelegateV2InstructionDataArgs &
    UpdateAsProgrammableConfigDelegateV2InstructionExtraArgs,
  'delegateMint' | 'delegateUpdateAuthority'
>;

// Instruction.
export function updateAsProgrammableConfigDelegateV2(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: UpdateAsProgrammableConfigDelegateV2InstructionAccounts &
    UpdateAsProgrammableConfigDelegateV2InstructionArgs
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
    token: { index: 2, isWritable: false, value: input.token ?? null },
    mint: { index: 3, isWritable: false, value: input.mint ?? null },
    metadata: { index: 4, isWritable: true, value: input.metadata ?? null },
    edition: { index: 5, isWritable: false, value: input.edition ?? null },
    payer: { index: 6, isWritable: true, value: input.payer ?? null },
    systemProgram: {
      index: 7,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    sysvarInstructions: {
      index: 8,
      isWritable: false,
      value: input.sysvarInstructions ?? null,
    },
    authorizationRulesProgram: {
      index: 9,
      isWritable: false,
      value: input.authorizationRulesProgram ?? null,
    },
    authorizationRules: {
      index: 10,
      isWritable: false,
      value: input.authorizationRules ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: UpdateAsProgrammableConfigDelegateV2InstructionArgs = {
    ...input,
  };

  // Default values.
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
  }
  if (!resolvedArgs.delegateMint) {
    resolvedArgs.delegateMint = expectPublicKey(resolvedAccounts.mint.value);
  }
  if (!resolvedArgs.delegateUpdateAuthority) {
    resolvedArgs.delegateUpdateAuthority = context.identity.publicKey;
  }
  if (!resolvedAccounts.delegateRecord.value) {
    resolvedAccounts.delegateRecord.value = findMetadataDelegateRecordPda(
      context,
      {
        mint: expectSome(resolvedArgs.delegateMint),
        delegateRole: MetadataDelegateRole.ProgrammableConfig,
        updateAuthority: expectSome(resolvedArgs.delegateUpdateAuthority),
        delegate: expectPublicKey(resolvedAccounts.authority.value),
      }
    );
  }
  if (!resolvedAccounts.metadata.value) {
    resolvedAccounts.metadata.value = findMetadataPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
    });
  }
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
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
  if (!resolvedAccounts.authorizationRulesProgram.value) {
    if (resolvedAccounts.authorizationRules.value) {
      resolvedAccounts.authorizationRulesProgram.value =
        context.programs.getPublicKey(
          'mplTokenAuthRules',
          'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg'
        );
      resolvedAccounts.authorizationRulesProgram.isWritable = false;
    }
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
  const data =
    getUpdateAsProgrammableConfigDelegateV2InstructionDataSerializer().serialize(
      resolvedArgs as UpdateAsProgrammableConfigDelegateV2InstructionDataArgs
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
