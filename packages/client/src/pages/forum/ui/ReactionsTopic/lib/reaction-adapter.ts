type ReactionEntity = Record<
  string,
  {
    count: number;
    reaction: string;
  }
>;

export function reactionAdapter(reactions: string[]) {
  return reactions.reduce<ReactionEntity>((acc, reaction) => {
    acc[reaction] = {
      count: acc[reaction] || 0 ? (acc[reaction].count += 1) : 1,
      reaction: reaction,
    };
    return acc;
  }, {});
}
