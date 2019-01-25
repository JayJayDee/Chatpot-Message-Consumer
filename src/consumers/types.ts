export namespace ConsumerTypes {
  export type QueueConsumer = {
    name: string;
    consume: <T>(payload: T) => Promise<void>;
  };

  export type ConsumerRunner = () => Promise<void>;
}