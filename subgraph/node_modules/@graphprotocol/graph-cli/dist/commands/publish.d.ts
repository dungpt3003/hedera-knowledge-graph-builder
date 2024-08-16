import { Command } from '@oclif/core';
export default class PublishCommand extends Command {
    static description: string;
    static args: {
        'subgraph-manifest': import("@oclif/core/lib/interfaces/parser").Arg<string, Record<string, unknown>>;
    };
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        'subgraph-id': import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        'protocol-network': import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        ipfs: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        'ipfs-hash': import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        'webapp-url': import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
    };
    /**
     * Prompt the user to open up the browser to continue publishing the subgraph
     */
    publishWithBrowser({ ipfsHash, webapp, subgraphId, protocolNetwork, }: {
        ipfsHash: string;
        webapp: string;
        subgraphId: string | undefined;
        protocolNetwork: string | undefined;
    }): Promise<void>;
    run(): Promise<void>;
}
