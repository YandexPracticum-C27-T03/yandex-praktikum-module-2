type ReactionEntity = Record<
  string,
  {
    count: number;
    reaction: string;
  }
>;

export const MIN_COUNTER_REACTION = 1;

export function reactionAdapter(reactions: string[]) {
  return reactions.reduce<ReactionEntity>((acc, reaction) => {
    acc[reaction] = {
      count: acc[reaction] ? acc[reaction].count + MIN_COUNTER_REACTION : MIN_COUNTER_REACTION,
      reaction: reaction,
    };
    return acc;
  }, {});
}
